const cds = require('@sap/cds');
const formatValidator = require('./common/FormatValidator');

class MetadataService {
  constructor() {
    this.metadataCache = new Map();
    this.formatValidatorInitialized = false;
    
    // Fields to skip validation for (handled elsewhere or have special logic)
    this.skipFields = new Set([
      'gender',         // Enum field with transformation logic
      'maritalStatus',   // Enum field with transformation logic (0->S, 1->M)
      'sourcedSDC',
      'workNexusIndicator'
    ]);
  }

  /**
   * Ensure format validator is initialized
   */
  async ensureFormatValidatorInitialized() {
    if (!this.formatValidatorInitialized) {
      await formatValidator.initialize();
      this.formatValidatorInitialized = true;
    }
  }

  /**
   * Get entity metadata from CDS schema
   * @param {string} entityName - Name of the entity
   * @returns {Object} Entity metadata including fields, types, and constraints
   */
  async getEntityMetadata(entityName) {
    if (this.metadataCache.has(entityName)) {
      return this.metadataCache.get(entityName);
    }

    try {
      // Get the entity definition from CDS
      const entity = cds.entities('com.aleron.monitor')[entityName];
      if (!entity) {
        throw new Error(`Entity ${entityName} not found`);
      }

      const metadata = {
        entityName: entityName,
        fields: {},
        requiredFields: [],
        fieldTypes: {},
        constraints: {}
      };

      // Extract field information from entity definition
      const elements = entity.elements || {};
      
      for (const [fieldName, fieldDef] of Object.entries(elements)) {
        // Convert enum to array if it exists
        let enumValues = null;
        if (fieldDef.enum) {
          if (Array.isArray(fieldDef.enum)) {
            enumValues = fieldDef.enum;
          } else if (typeof fieldDef.enum === 'object') {
            // If enum is an object, extract the values
            enumValues = Object.values(fieldDef.enum);
          } else if (typeof fieldDef.enum === 'string') {
            // If enum is a string, split by comma
            enumValues = fieldDef.enum.split(',').map(v => v.trim());
          }
        }

        metadata.fields[fieldName] = {
          type: fieldDef.type?.name || 'String',
          length: fieldDef.length,
          notNull: fieldDef.notNull || false,
          key: fieldDef.key || false,
          unique: fieldDef.unique || false,
          default: fieldDef.default,
          enum: enumValues
        };

        // Track field types for validation
        metadata.fieldTypes[fieldName] = fieldDef.type?.name || 'String';

        // Track required fields
        if (fieldDef.notNull && !fieldDef.default) {
          metadata.requiredFields.push(fieldName);
        }

        // Extract constraints
        metadata.constraints[fieldName] = {
          maxLength: fieldDef.length,
          notNull: fieldDef.notNull,
          unique: fieldDef.unique,
          enum: fieldDef.enum,
          type: fieldDef.type?.name || 'String'
        };
      }

      // Cache the metadata
      this.metadataCache.set(entityName, metadata);
      return metadata;

    } catch (error) {
      console.error(`Error getting metadata for entity ${entityName}:`, error);
      throw error;
    }
  }

  /**
   * Get interface-specific entity metadata
   * @param {string} interfaceId - Interface ID (e.g., 'T', 'U', '1', etc.)
   * @returns {Object} Entity metadata for the interface
   */
  async getInterfaceEntityMetadata(interfaceId) {
    const interfaceEntityMap = {
      '1': 'WorkOrders_WN',
      'C': 'Times',
      '3': 'Times',
      'T': 'EmployeeHires',
      'U': 'StaffHires',
      'S': 'WorkOrders',
      'M': 'WorkOrders_FG',
      '4': 'Terminations',
      'D': 'Credit_Rebill',
      'N': 'Fg_Invoices',
      'Q': 'Fg_Credit_Rebill',
      'O': 'OtherBillables',
      'G': 'Bonus',
      'E': 'SowScWo',
      'F': 'SowScInvoice',
      '2': 'Travel',
      'A': 'Drug_Background_Check'
    };

    const entityName = interfaceEntityMap[interfaceId];
    if (!entityName) {
      throw new Error(`Unknown interface ID: ${interfaceId}`);
    }

    return await this.getEntityMetadata(entityName);
  }

  /**
   * Validate record against entity metadata
   * @param {Object} record - Record to validate
   * @param {Object} metadata - Entity metadata
   * @param {number} recordIndex - Index of the record for error reporting
   * @returns {Array} Array of validation errors
   */
  async validateRecord(record, metadata, recordIndex = 0) {
    const errors = [];

    // Ensure format validator is initialized
    await this.ensureFormatValidatorInitialized();

    // Check required fields
    for (const requiredField of metadata.requiredFields) {
      if (record[requiredField] === undefined || record[requiredField] === null || record[requiredField] === '') {
        errors.push({
          field: requiredField,
          message: `Required field '${requiredField}' is missing`,
          code: 'REQUIRED_FIELD_MISSING',
          severity: 'error',
          recordIndex: recordIndex
        });
      }
    }

    // Validate each field in the record
    for (const [fieldName, value] of Object.entries(record)) {
      // Skip validation for fields in skip list
      if (this.skipFields.has(fieldName)) {
        continue;
      }

      if (value === undefined || value === null || value === '') {
        continue; // Skip empty values for non-required fields
      }

      const fieldMetadata = metadata.fields[fieldName];
      if (!fieldMetadata) {
        // Field not defined in entity schema
        errors.push({
          field: fieldName,
          message: `Field '${fieldName}' is not defined in entity schema`,
          code: 'UNKNOWN_FIELD',
          severity: 'warning',
          recordIndex: recordIndex
        });
        continue;
      }

      // Validate field type and constraints
      const fieldErrors = this.validateFieldValue(fieldName, value, fieldMetadata, recordIndex);
      errors.push(...fieldErrors);

      // Validate format patterns (NEW)
      const formatError = formatValidator.validateField(metadata.entityName, fieldName, value);
      if (formatError) {
        errors.push({
          ...formatError,
          recordIndex: recordIndex
        });
      }
    }

    return errors;
  }

  /**
   * Validate individual field value
   * @param {string} fieldName - Name of the field
   * @param {any} value - Value to validate
   * @param {Object} fieldMetadata - Field metadata
   * @param {number} recordIndex - Record index for error reporting
   * @returns {Array} Array of validation errors for this field
   */
  validateFieldValue(fieldName, value, fieldMetadata, recordIndex) {
    const errors = [];

    // Skip validation for fields in skip list (have transformation logic)
    if (this.skipFields.has(fieldName)) {
      return errors;
    }

    // Convert value to string for length validation
    const stringValue = String(value);

    // Check string length constraints
    if (fieldMetadata.length && stringValue.length > fieldMetadata.length) {
      errors.push({
        field: fieldName,
        message: `Value '${value}' exceeds maximum length of ${fieldMetadata.length}`,
        code: 'MAX_LENGTH_EXCEEDED',
        severity: 'error',
        value: value,
        recordIndex: recordIndex
      });
    }

    // Type-specific validations
    switch (fieldMetadata.type) {
      case 'String':
        // String validations
        break;
      
      case 'Integer':
      case 'Integer64':
        if (!/^-?\d+$/.test(stringValue)) {
          errors.push({
            field: fieldName,
            message: `Value '${value}' is not a valid integer`,
            code: 'INVALID_INTEGER',
            severity: 'error',
            value: value,
            recordIndex: recordIndex
          });
        }
        break;
      
      case 'Decimal':
        if (!/^-?\d+(\.\d+)?$/.test(stringValue)) {
          errors.push({
            field: fieldName,
            message: `Value '${value}' is not a valid decimal`,
            code: 'INVALID_DECIMAL',
            severity: 'error',
            value: value,
            recordIndex: recordIndex
          });
        }
        break;
      
      case 'Date':
        if (!/^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
          errors.push({
            field: fieldName,
            message: `Value '${value}' is not a valid date (YYYY-MM-DD)`,
            code: 'INVALID_DATE',
            severity: 'error',
            value: value,
            recordIndex: recordIndex
          });
        }
        break;
      
      case 'DateTime':
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(stringValue)) {
          errors.push({
            field: fieldName,
            message: `Value '${value}' is not a valid datetime`,
            code: 'INVALID_DATETIME',
            severity: 'error',
            value: value,
            recordIndex: recordIndex
          });
        }
        break;
      
      // case 'Boolean':
      //   if (!['true', 'false', 'X', 'Y', 'N', '1', '0'].includes(stringValue.toUpperCase())) {
      //     errors.push({
      //       field: fieldName,
      //       message: `Value '${value}' is not a valid boolean`,
      //       code: 'INVALID_BOOLEAN',
      //       severity: 'error',
      //       value: value,
      //       recordIndex: recordIndex
      //     });
      //   }
      //   break;
    }

    // Enum validation
    if (fieldMetadata.enum && Array.isArray(fieldMetadata.enum) && !fieldMetadata.enum.includes(value)) {
      errors.push({
        field: fieldName,
        message: `Value '${value}' is not valid. Allowed values: ${fieldMetadata.enum.join(', ')}`,
        code: 'INVALID_ENUM_VALUE',
        severity: 'error',
        value: value,
        recordIndex: recordIndex
      });
    }

    return errors;
  }

  /**
   * Clear metadata cache
   */
  clearCache() {
    this.metadataCache.clear();
  }
}

module.exports = MetadataService;

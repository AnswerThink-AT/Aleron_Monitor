const cds = require('@sap/cds');

/**
 * Format Validator - Validates field values against CDS @assert.format annotations
 * This utility extracts format patterns from CDS schema and validates data against them
 */
class FormatValidator {
  constructor() {
    this.formatPatterns = new Map();
    this.initialized = false;
    
    // Fields to skip validation for (handled elsewhere or have special logic)
    this.skipFields = new Set([
      'gender',         // Enum field with transformation logic
      'maritalStatus'   // Enum field with transformation logic (0->S, 1->M)
    ]);
  }

  /**
   * Initialize format patterns from CDS schema
   * Extracts all @assert.format patterns from entity definitions
   */
  async initialize() {
    if (this.initialized) {
      return;
    }

    try {
      // Get all entities from the monitor namespace
      const entities = cds.entities('com.aleron.monitor');
      
      // Extract format patterns from all entities
      for (const [entityName, entityDef] of Object.entries(entities)) {
        const elements = entityDef.elements || {};
        
        for (const [fieldName, fieldDef] of Object.entries(elements)) {
          // Check if field has @assert.format annotation
          const formatPattern = this._extractFormatPattern(fieldDef);
          
          if (formatPattern) {
            const key = `${entityName}.${fieldName}`;
            this.formatPatterns.set(key, {
              pattern: formatPattern,
              regex: new RegExp(formatPattern),
              fieldName: fieldName,
              entityName: entityName,
              type: fieldDef.type?.name || 'String'
            });
          }

          // Also check if the field type itself has a format pattern (for custom types)
          if (fieldDef.type && typeof fieldDef.type === 'object') {
            const typeFormatPattern = this._extractFormatPattern(fieldDef.type);
            if (typeFormatPattern && !formatPattern) {
              const key = `${entityName}.${fieldName}`;
              this.formatPatterns.set(key, {
                pattern: typeFormatPattern,
                regex: new RegExp(typeFormatPattern),
                fieldName: fieldName,
                entityName: entityName,
                type: fieldDef.type?.name || 'String'
              });
            }
          }
        }
      }

      // Also load global types with format patterns
      this._loadGlobalTypePatterns();
      
      this.initialized = true;
      console.log(`[FormatValidator] Initialized with ${this.formatPatterns.size} format patterns`);
      
    } catch (error) {
      console.error('[FormatValidator] Error initializing format patterns:', error);
      throw error;
    }
  }

  /**
   * Load format patterns from GlobalTypes context
   */
  _loadGlobalTypePatterns() {
    // Define known global type patterns from types.cds
    const globalTypePatterns = {
      'ABAPDate': '^[0-9]{8}$',              // YYYYMMDD
      'PersonnelNumber': '^[0-9]{8}$',       // PERNR
      'SalesDocumentItem': '^[0-9]{1,6}$',   // POSNR
      'PurchasingDocumentItem': '^[0-9]{1,5}$', // EBELP
      'TripNumber': '^[0-9]{10}$',           // REINR
      'FiscalYear': '^[0-9]{4}$',            // GJAHR
      'InvoiceDocumentNumber': '^[0-9]{1,10}$', // BELNR
      'Email': '^.*[^\\s]@[^\\s].*[.][^\\s].*$' // Email pattern
    };

    // Store these for reference when validating by type
    this.globalTypePatterns = new Map();
    for (const [typeName, pattern] of Object.entries(globalTypePatterns)) {
      this.globalTypePatterns.set(typeName, {
        pattern: pattern,
        regex: new RegExp(pattern),
        typeName: typeName
      });
    }
  }

  /**
   * Extract format pattern from field definition
   * @param {Object} fieldDef - Field definition from CDS
   * @returns {string|null} Format pattern or null
   */
  _extractFormatPattern(fieldDef) {
    if (!fieldDef) return null;

    // Check for @assert.format annotation
    if (fieldDef['@assert.format']) {
      return fieldDef['@assert.format'];
    }

    // Alternative annotation paths
    if (fieldDef.assert && fieldDef.assert.format) {
      return fieldDef.assert.format;
    }

    return null;
  }

  /**
   * Validate a single field value against its format pattern
   * @param {string} entityName - Entity name (e.g., 'EmployeeHires')
   * @param {string} fieldName - Field name (e.g., 'dateOfBirth')
   * @param {any} value - Value to validate
   * @returns {Object|null} Validation error object or null if valid
   */
  validateField(entityName, fieldName, value) {
    if (!this.initialized) {
      throw new Error('FormatValidator not initialized. Call initialize() first.');
    }

    // Skip validation for fields in skip list
    if (this.skipFields.has(fieldName)) {
      return null;
    }

    // Skip validation for null/undefined/empty values
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const key = `${entityName}.${fieldName}`;
    const formatInfo = this.formatPatterns.get(key);

    if (!formatInfo) {
      // No format pattern defined for this field
      return null;
    }

    const stringValue = String(value);
    
    if (!formatInfo.regex.test(stringValue)) {
      return {
        field: fieldName,
        value: value,
        message: `Value "${value}" is not in specified format "${formatInfo.pattern}"`,
        code: 'INVALID_FORMAT',
        severity: 'error',
        expectedFormat: formatInfo.pattern
      };
    }

    return null;
  }

  /**
   * Validate all fields in a record
   * @param {string} entityName - Entity name
   * @param {Object} record - Record to validate
   * @param {number} recordIndex - Index for error reporting
   * @returns {Array} Array of validation errors
   */
  validateRecord(entityName, record, recordIndex = 0) {
    if (!this.initialized) {
      throw new Error('FormatValidator not initialized. Call initialize() first.');
    }

    const errors = [];

    for (const [fieldName, value] of Object.entries(record)) {
      const error = this.validateField(entityName, fieldName, value);
      if (error) {
        errors.push({
          ...error,
          recordIndex: recordIndex,
          record_ID: record.ID
        });
      }
    }

    return errors;
  }

  /**
   * Validate by field type (for fields using GlobalTypes)
   * @param {string} typeName - Type name (e.g., 'ABAPDate')
   * @param {string} fieldName - Field name for error reporting
   * @param {any} value - Value to validate
   * @returns {Object|null} Validation error object or null if valid
   */
  validateByType(typeName, fieldName, value) {
    if (!this.initialized) {
      throw new Error('FormatValidator not initialized. Call initialize() first.');
    }

    // Skip validation for fields in skip list
    if (this.skipFields.has(fieldName)) {
      return null;
    }

    // Skip validation for null/undefined/empty values
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const typeInfo = this.globalTypePatterns.get(typeName);
    if (!typeInfo) {
      return null; // No pattern for this type
    }

    const stringValue = String(value);
    
    if (!typeInfo.regex.test(stringValue)) {
      return {
        field: fieldName,
        value: value,
        message: `Value "${value}" is not in specified format "${typeInfo.pattern}"`,
        code: 'INVALID_FORMAT',
        severity: 'error',
        expectedFormat: typeInfo.pattern,
        typeName: typeName
      };
    }

    return null;
  }

  /**
   * Get all format patterns for an entity
   * @param {string} entityName - Entity name
   * @returns {Map} Map of field names to format patterns
   */
  getEntityFormatPatterns(entityName) {
    const patterns = new Map();
    
    for (const [key, value] of this.formatPatterns.entries()) {
      if (key.startsWith(`${entityName}.`)) {
        const fieldName = key.substring(entityName.length + 1);
        patterns.set(fieldName, value);
      }
    }

    return patterns;
  }

  /**
   * Check if a field has format validation
   * @param {string} entityName - Entity name
   * @param {string} fieldName - Field name
   * @returns {boolean} True if format validation exists
   */
  hasFormatValidation(entityName, fieldName) {
    const key = `${entityName}.${fieldName}`;
    return this.formatPatterns.has(key);
  }

  /**
   * Get format pattern for a field
   * @param {string} entityName - Entity name
   * @param {string} fieldName - Field name
   * @returns {Object|null} Format pattern info or null
   */
  getFormatPattern(entityName, fieldName) {
    const key = `${entityName}.${fieldName}`;
    return this.formatPatterns.get(key) || null;
  }

  /**
   * Clear cache and reinitialize
   */
  async reinitialize() {
    this.formatPatterns.clear();
    this.globalTypePatterns = null;
    this.initialized = false;
    await this.initialize();
  }
}

// Export singleton instance
const formatValidator = new FormatValidator();

module.exports = formatValidator;


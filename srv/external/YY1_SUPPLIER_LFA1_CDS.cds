/* checksum : 0ef6020140eb3e89bbe96ea47d1824a3 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service YY1_SUPPLIER_LFA1_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Supplier_LFA1'
entity YY1_SUPPLIER_LFA1_CDS.YY1_Supplier_LFA1 {
  @sap.required.in.filter : 'false'
  @sap.label : 'BP GUID'
  @sap.quickinfo : 'Business Partner GUID'
  key BusinessPartnerUUID : UUID not null;
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'Supplier'
  @sap.quickinfo : 'Account Number of Supplier'
  Supplier : String(10);
  @sap.display.format : 'UpperCase'
  @sap.required.in.filter : 'false'
  @sap.label : 'SCAC'
  @sap.quickinfo : 'Standard carrier access code'
  SupplierStandardCarrierAccess : String(4);
};


/* checksum : 12fa95c8bb8bd11afec503e3476852b2 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service YY1_BILLINGTYPE_CDS {};

@cds.external : true
@cds.persistence.skip : true
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Billing type'
entity YY1_BILLINGTYPE_CDS.YY1_BILLINGTYPE {
  @sap.label : 'UUID'
  @sap.quickinfo : '16 Byte UUID in 16 Bytes (Raw Format)'
  key SAP_UUID : UUID not null;
  @sap.label : 'SO order Type'
  @sap.quickinfo : 'Sales order Type'
  SO_order_Type : String(4);
  @sap.label : 'Billing type'
  Billing_type : String(4);
  @sap.label : 'Standard Order Type'
  StandardOrderType : String(20);
};


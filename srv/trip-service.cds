using  trip as db from '../db/tripschema';
using { Country, Currency } from '@sap/cds/common';


service TripService {

  @Capabilities: {
    InsertRestrictions: { $Type: 'Capabilities.InsertRestrictionsType', Insertable: true },
    UpdateRestrictions: { $Type: 'Capabilities.UpdateRestrictionsType', Updatable: true },
    DeleteRestrictions: { $Type: 'Capabilities.DeleteRestrictionsType', Deletable: false },
    NavigationRestrictions: {
      $Type: 'Capabilities.NavigationRestrictionsType',
      RestrictedProperties: [
        {
          $Type: 'Capabilities.NavigationPropertyRestriction',
          NavigationProperty: 'DraftAdministrativeData',
          FilterRestrictions: {
            $Type: 'Capabilities.FilterRestrictionsType',
            Filterable: false
          }
        }
      ]
    }
  }

  // @odata.draft.enabled: false
  @odata.insertable: true
  @odata.updatable:  true
  @odata.deletable:  false
  entity Trip       as projection on db.Trip;

  // @odata.draft.bypass
  entity TRIPHeader as projection on db.TRIPHeader;

  // @odata.draft.bypass
  @Capabilities.InsertRestrictions: { $Type: 'Capabilities.InsertRestrictionsType', Insertable: true }
  @Capabilities.UpdateRestrictions: { $Type: 'Capabilities.UpdateRestrictionsType', Updatable: true }
  entity TRIPItem   as projection on db.TRIPItem;

  // @odata.draft.bypass
  entity TRIPCost   as projection on db.TRIPCost;

  entity ExpenseTypes as projection on db.ExpenseTypes;
  entity TripReport as projection on db.TripReport;
  entity TripStatusLists as projection on db.TripStatusLists;
  // Custom Actions
  action createFullTrip(
    Personnel   : String(8),
    StartOfTrip : Date,
    EndOfTrip   : Date
  ) returns Trip;

  action deleteFullTrip(
    TripNumbers : array of Integer);
  

  action cancelTrip(
    TripNumbers : array of Integer
  ) returns Boolean;

  action approveTrip(
    TripNumbers : array of Integer
  ) returns Boolean;
  
  action markTripSettled(
    TripNumbers : array of Integer
  ) returns Boolean;

  action markSettleError(
    TripNumbers : array of Integer
  ) returns Boolean;
 entity BusinessUser {
  key PersonExternalID : String(60);
  PersonID             : String(10);
  PersonFullName       : String(258);
  UserName             : String(40);
  EmailAddress         : String(241);
  BusinessPartnerID         : String(10);  // new
      BusinessPartnerExternalID : String(60);  // new
      BusinessPartnerRoleCode   : String(6);   // new
      RoleName                  : String(40);  // new
}

entity CachedBusinessUser as projection on db.CachedBusinessUser;

entity WorkAssignmentCache as projection on db.WorkAssignmentCache;

action refreshWorkAssignmentCache() returns Integer;


entity ExpenseTypeMapping as projection on db.ExpenseTypeMapping;

entity EnterpriseProjectCache as projection on db.EnterpriseProjectCache;



function getCountryCurrencyMap()
    returns array of {
      Country  : Country;
      Currency : Currency;
    };
         


/**
   * Posts a raw Journal-Entry SOAP envelope to S/4 and returns the raw response.
   * @param xmlPayload  – full SOAP envelope as text (including <soapenv:Envelope>…)
   * @returns rawResponse – full HTTP response body (XML or error text)
   */
  action postJournalEntry(
    xmlPayload : String
  ) returns String;

}
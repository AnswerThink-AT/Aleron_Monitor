using { AnalyticsService } from './analytics-service';

// --- Element-level annotations (labels, value help) ---
annotate AnalyticsService.FileStepSummary with {
  interfaceId  @Common.Label : 'Interface';
  interfaceId  @Common.Text  : interfaceName;
  interfaceName @UI.Hidden   : true;

  fileName     @Common.Label : 'File';
  uploadedAt   @Common.Label : 'Uploaded On';
  processLevel @Common.Label : 'Step';
  valid        @Common.Label : 'Valid?';
  recordCount  @Common.Label : 'Records';

  // Value Help on Interface
  interfaceId @Common.ValueList: {
    $Type         : 'Common.ValueListType',
    CollectionPath: 'VH_InterfaceTypes',
    Parameters    : [
      { $Type: 'Common.ValueListParameterInOut',    LocalDataProperty: interfaceId, ValueListProperty: 'ID' },
      { $Type: 'Common.ValueListParameterDisplayOnly',               ValueListProperty: 'name' }
    ]
  };
};

// --- Entity-level annotations (MUST be outside the block) ---

// Filter bar fields
annotate AnalyticsService.FileStepSummary with
  @UI.SelectionFields : [ interfaceId, uploadedAt ];

// Header chart
annotate AnalyticsService.FileStepSummary with @UI.Chart #Primary: {
  Title              : 'Records by Step',
  ChartType          : #Column,
  Measures           : [ recordCount ],
  MeasureAttributes  : [ { Measure: recordCount, Role: #Axis1 } ],
  Dimensions         : [ processLevel, valid ],
  DimensionAttributes: [
    { Dimension: processLevel, Role: #Category },
    { Dimension: valid,        Role: #Series }
  ]
};

// Table columns
annotate AnalyticsService.FileStepSummary with @UI.LineItem #Primary: [
  { $Type: 'UI.DataField', Value: interfaceName },
  { $Type: 'UI.DataField', Value: processLevel  },
  { $Type: 'UI.DataField', Value: valid        },
  { $Type: 'UI.DataField', Value: fileName     },
  { $Type: 'UI.DataField', Value: uploadedAt   },
  { $Type: 'UI.DataField', Value: recordCount  }
];

// Wire chart + table + filters
annotate AnalyticsService.FileStepSummary with @UI.PresentationVariant #Primary: {
  SortOrder      : [ { Property: recordCount, Descending: true } ],
  Visualizations : [
    { $AnnotationPath: '@UI.Chart#Primary'    },
    { $AnnotationPath: '@UI.LineItem#Primary' }
  ]
};

annotate AnalyticsService.FileStepSummary with @UI.SelectionVariant #Primary: {
  Text          : 'Filter',
  SelectOptions : [
    { PropertyName: interfaceId },
    { PropertyName: uploadedAt }
  ]
};

annotate AnalyticsService.FileStepSummary with @UI.SelectionPresentationVariant #Primary: {
  PresentationVariantQualifier : 'Primary',
  SelectionVariantQualifier    : 'Primary'
};

// Read-only (avoids "NewPage" noise)
annotate AnalyticsService.FileStepSummary with
  @Capabilities.InsertRestrictions.Insertable : false;
annotate AnalyticsService.FileStepSummary with
  @Capabilities.UpdateRestrictions.Updatable  : false;
annotate AnalyticsService.FileStepSummary with
  @Capabilities.DeleteRestrictions.Deletable  : false;

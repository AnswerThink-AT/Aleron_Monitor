using MonitorService as service from './monitor-service';

annotate service with @cds.server.body_parser.limit: '20mb';


annotate service.Files with @(Capabilities: {
    Deletable         : false,
    SearchRestrictions: {
        $Type     : 'Capabilities.SearchRestrictionsType',
        Searchable: false,
    },
    FilterRestrictions: {
        $Type                       : 'Capabilities.FilterRestrictionsType',
        FilterExpressionRestrictions: [
            {
                $Type             : 'Capabilities.FilterExpressionRestrictionType',
                Property          : ID,
                AllowedExpressions: 'SingleValue',
            },
            {
                $Type             : 'Capabilities.FilterExpressionRestrictionType',
                Property          : createdAt,
                AllowedExpressions: 'SingleRange',
            },
        ]
    },
}, ) {
    @Common.ValueListWithFixedValues: true
    status;
    @Common.ValueListWithFixedValues: true
    interfaceType;
};

annotate service.Times with @(Capabilities.Deletable: false);
annotate service.WorkOrders with @(Capabilities.Deletable: false);

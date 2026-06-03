sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'configuration/test/integration/FirstJourney',
		'configuration/test/integration/pages/ConfigurationsList',
		'configuration/test/integration/pages/ConfigurationsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ConfigurationsList, ConfigurationsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('configuration') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheConfigurationsList: ConfigurationsList,
					onTheConfigurationsObjectPage: ConfigurationsObjectPage
                }
            },
            opaJourney.run
        );
    }
);
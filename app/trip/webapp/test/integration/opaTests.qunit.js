sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'trip/test/integration/FirstJourney',
		'trip/test/integration/pages/TripList',
		'trip/test/integration/pages/TripObjectPage'
    ],
    function(JourneyRunner, opaJourney, TripList, TripObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('trip') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTripList: TripList,
					onTheTripObjectPage: TripObjectPage
                }
            },
            opaJourney.run
        );
    }
);
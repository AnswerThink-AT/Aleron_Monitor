sap.ui.require(
  [
    'sap/fe/test/JourneyRunner',
    'monitor/test/integration/FirstJourney',
    'monitor/test/integration/pages/MonitorHeaderList',
    'monitor/test/integration/pages/MonitorHeaderObjectPage',
  ],
  function (JourneyRunner, opaJourney, MonitorHeaderList, MonitorHeaderObjectPage) {
    'use strict';
    var journeyRunner = new JourneyRunner({
      // start index.html in web folder
      launchUrl: sap.ui.require.toUrl('monitor') + '/index.html',
    });

    journeyRunner.run(
      {
        pages: {
          onTheMonitorHeaderList: MonitorHeaderList,
          onTheMonitorHeaderObjectPage: MonitorHeaderObjectPage,
        },
      },
      opaJourney.run,
    );
  },
);

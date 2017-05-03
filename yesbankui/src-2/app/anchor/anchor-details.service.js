(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .service('AnchorDetailsService', AnchorDetailsService);

  function AnchorDetailsService($http, urls, $rootScope) {

    var factory = {
      getAnchorDetailsData: function () {
        var data = $http({
          method: 'POST', url: urls.apiUrl + 'getAnchorsDetail', data: {
            "getAnchorsDetail": {
              "AnchorRefNumber": "ALL",
              "Enabled":"N"
            }
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getAnchorDetailsDataWithYes: function () {
        var data = $http({
          method: 'POST', url: urls.apiUrl + 'getAnchorsDetail', data: {
            "getAnchorsDetail": {
              "AnchorRefNumber": "ALL",
              "Enabled":"Y"
            }
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      }

    };
    return factory;
  }
})();

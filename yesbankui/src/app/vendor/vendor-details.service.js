(function () {
  'use strict';

  angular
    .module('yesBankAngular.vendor')
    .service('VendorDetailsService', VendorDetailsService);

  function VendorDetailsService($http, urls, $rootScope) {

    var factory = {
      getVendorDetailsData: function () {
        var data = $http({
          method: 'POST', url: urls.apiUrl + 'getVendorsDetail', data: {
            "getVendorsDetail": {
              "VendorRefNumber": "ALL",
              "Enabled":"N",
              "AnchorRefNumber":""
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
      getVendorDetailsDataWithYes: function () {
        var data = $http({
          method: 'POST', url: urls.apiUrl + 'getVendorsDetail', data: {
            "getVendorsDetail": {
              "VendorRefNumber": "ALL",
              "Enabled":"Y",
              "AnchorRefNumber":""
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
      getVendorDetailsDataWithRef: function (AnchorRefNumber) {
        var data = $http({
          method: 'POST', url: urls.apiUrl + 'getVendorsDetail', data: {
            "getVendorsDetail": {
              "Enabled":"Y",
              "AnchorRefNumber":AnchorRefNumber
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

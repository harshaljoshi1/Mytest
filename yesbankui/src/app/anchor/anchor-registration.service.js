(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .service('AnchorRegistrationService', AnchorRegistrationService);

  function AnchorRegistrationService($http, urls, $rootScope) {

    var factory = {
      submitAnchorRegistration: function (anchor) {
        debugger;
        var CustomerMobileNo = anchor.CustomerMobileNo.toString();

        var data = $http({
          method: 'POST', url: urls.apiUrl + 'AnchorRegistration', data: {
            "AnchorRegistration": {
              "CustomerMobileNo": CustomerMobileNo,
              "CustomerName": anchor.CustomerName,
              "CustomerEmail":anchor.CustomerEmail,
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
      }

    };
    return factory;
  }
})();

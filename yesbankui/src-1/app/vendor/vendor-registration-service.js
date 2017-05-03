(function () {
  'use strict';

  angular
    .module('yesBankAngular.vendor')
    .service('VendorRegistrationService', VendorRegistrationService);

  function VendorRegistrationService($http, urls, $rootScope) {
    var factory = {
      submitVendorRegistration: function (vendor) {
        debugger;
        var data = $http({
          method: 'POST', url: urls.apiUrl + 'VendorRegistration', data: {
            "VendorRegistartion": {
              "AnchorRefNumber":vendor.AnchorRefNumber,
              "VendorBankAddress":vendor.VendorBankAddress,
              "Landmark":vendor.Landmark,
              "SupplierCode":vendor.SupplierCode,
              "VendorFirstName":vendor.VendorFirstName,
              "VendorLastName":vendor.VendorLastName,
              "IFSCCode": vendor.IFSCCode,
              "LimitExpiryDate":vendor.LimitExpiryDate,
              "SupplierLimit": vendor.SupplierLimit,
              "VendorEmail": vendor.VendorEmail,
              "VendorPhone": vendor.VendorPhone,
              "VendorPAN": vendor.VendorPAN,
              "VendorAddress": vendor.VendorAddress,
              "SupplierAccount":vendor.SupplierAccount,
              "VendorBankName":vendor.VendorBankName,
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

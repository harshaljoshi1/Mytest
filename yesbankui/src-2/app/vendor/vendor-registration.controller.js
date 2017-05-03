(function () {
  'use strict';

  angular
      .module('yesBankAngular.vendor')
      .controller('VendorRegistrationController', VendorRegistrationController);

  /** @ngInject */
  function VendorRegistrationController($scope, VendorRegistrationService, AnchorDetailsService, urls) {

    $scope.registerVendor = function(vendor){
      debugger;
      $scope.submitted = true;
      if($scope.myForm.$valid){
        vendor.VendorPhone = vendor.VendorPhone.toString();
        VendorRegistrationService.submitVendorRegistration(vendor).then(function (result) {
          alert(" vendor registration is  successful");

        }, function (result) {
          alert("Error: Failed vendor registration ");
        });
      }

    };
    AnchorDetailsService.getAnchorDetailsData().then(function (result) {

      debugger;
      $scope.anchorList = result.data.getAnchorsDetailResponse.ListofAnchors;

    }, function (result) {
      alert("Error: anchor Details not recieved");
    });
  }
})();

(function () {
  'use strict';

  angular
    .module('yesBankAngular.vendor')
    .controller('VendorAgreementController', VendorAgreementController);

  /** @ngInject */
  function VendorAgreementController($scope, $state, apiCallService, VendorDetailsService, urls) {

    $scope.select = {optradio: ''};
    $scope.EnabledValue = '';


    $scope.cancelSelect = function () {
      $state.go('app.stats');
    };
    $scope.loading=true;
    $scope.getRegVendorList = function () {

      VendorDetailsService.getVendorDetailsData().then(function (result) {
        $scope.loading=false;
        $scope.vendorList = result.data.getVendorsDetailResponse.ListofVendors;


      }, function (result) {
        alert("Error: Vendor details not recived");
      });
    };


    $scope.getRegVendorList();
    angular.forEach($scope.anchorList, function (item) {
      if (item.AnchorRefNumber === $scope.select.optradio) {
        $scope.EnabledValue = item.Enabled;
      }
    });

    $scope.renderVendorDetails = function (val1, val2) {
      console.log("value ", val1);
      if (val1 != null) {
       $state.go('app.modify-vendor-agreement',{refNo:val1,enabled:val2});
      }
      else {
        console.log('null');
        alert('reference number is not specified');
      }
    };
  }
})();

(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .controller('AnchorSignPurchaseOrderController', AnchorSignPurchaseOrderController);

  /** @ngInject */
  function AnchorSignPurchaseOrderController($scope, $uibModal, $state, AnchorProgramService, apiCallService) {
    $scope.select = { optradio: '' };

    $scope.okSelect = function () {

      $state.go('app.modify-anchor-sign-purchase-order');
    };

    // action definition when Cancel button in clicked
    $scope.cancelSelect = function () {
      $state.go('app.stats');
    };


    $scope.getAllAnchorProgramDetails = function () {
      $scope.loading = true;

      AnchorProgramService.getAnchorProgramDetails().then(function (result) {

        var responseString = result.data.result.message;
        responseString = responseString.replace(/'/g, '"');
        responseString = JSON.parse(responseString);
        $scope.loading = false;

        $scope.loopThroughAnchorProgramIds = responseString;


      }, function (result) {
        alert("Error: get All Anchor Program Details");
      });
    };
    $scope.getAllAnchorProgramDetails();

    $scope.renderAnchorProgramDetails = function (val) {
      console.log("value ", val);
      if (val != null) {
        $state.go('app.modify-anchor-sign-purchase-order', { programId: val });
      }
      else {
        console.log('null');
        alert('reference number is not specified');
      }
    };



  }
})();

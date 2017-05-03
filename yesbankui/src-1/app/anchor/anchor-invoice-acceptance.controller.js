(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .controller('AnchorInvoiceAcceptanceController', AnchorInvoiceAcceptanceController);

  /** @ngInject */
  function AnchorInvoiceAcceptanceController($scope, $uibModal, $state, AnchorProgramService, apiCallService) {
    $scope.select = { optradio: '' };


    // action definition when Cancel button in clicked
    $scope.cancelSelect = function () {
      $state.go('app.stats');
    };
    $scope.loading = true;

    $scope.getAllAnchorProgramDetails = function () {
      AnchorProgramService.getInvoiceDetails().then(function (result) {

        var responseString = result.data.result.message;
        responseString = responseString.replace(/'/g, '"');
        responseString = JSON.parse(responseString);
        $scope.loading = false;
        $scope.loopThroughInvoices = responseString;

      }, function (result) {
        alert("Error: get All Anchor Program Details");
      });
    };
    $scope.getAllAnchorProgramDetails();

    $scope.renderAnchorInvoiceDetails = function (val) {

      if (val != null) {
         $state.go('app.modify-anchor-invoice-acceptance',{
           poIDr:val.poIDr,
           moID:val.moID
         });
      }
      else {
        alert('reference number is not specified');
      }
    };
    console.log("entered into anchor invoice acceptance controller");


  }
})();

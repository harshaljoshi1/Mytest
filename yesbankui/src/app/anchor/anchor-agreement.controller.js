(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .controller('AnchorAgreementController', AnchorAgreementController);

  /** @ngInject */
  function AnchorAgreementController($scope, $uibModal, $state, urls, apiCallService, AnchorDetailsService) {
    $scope.select = {optradio: ''};

    $scope.cancelSelect = function () {
      $state.go('app.stats');
    };
    $scope.loading=true;


    $scope.getListOfRegAnchors = function(){
      console.log("entered");

      AnchorDetailsService.getAnchorDetailsData().then(function (result) {

       /* if(typeof(result.data.getAnchorsDetailResponse.ListofAnchors)=="object"){
          var singleObj = result.data.getAnchorsDetailResponse;
          var result = $.map(singleObj, function(el) { return el });
          $scope.anchorList = result;
        }*/
        console.log("entered");

         $scope.loading=false;
        $scope.anchorList = result.data.getAnchorsDetailResponse.ListofAnchors;
        console.log(" $scope.anchorList", $scope.anchorList);

      }, function (result) {
        alert("Error: anchor Details not recieved");
      });
    };

    $scope.getListOfRegAnchors();

    $scope.renderAnchorDetails = function (val1,val2) {
      console.log("value ", val1);
      if (val1 != null) {
        $state.go('app.modify-anchor-agreement',{refNo:val1,enabled:val2});

      }
      else {
        console.log('null');
        alert('reference number is not specified');
      }
    };
  }
})();

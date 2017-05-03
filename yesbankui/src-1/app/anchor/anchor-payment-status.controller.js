(function () {
    'use strict';

    angular
        .module('yesBankAngular.vendor')
        .controller('AnchorPaymentStatusController', AnchorPaymentStatusController);

    /** @ngInject */
    function AnchorPaymentStatusController($scope,AnchorProgramService) {
      $scope.loading=true;
    $scope.getVendorPaymentStatusDetails = function(){
      AnchorProgramService.getInvoiceDetails().then(function (result) {

        var responseString = result.data.result.message;
        var moStatus3 = 0;
        var moStatus6 = 0;
        var moStatus9 = 0;

        responseString = responseString.replace(/'/g, '"');
        responseString = JSON.parse(responseString);
        $scope.loading=false;
        $scope.loopThroughAnchorProgramIds = responseString;
        console.log("response is",responseString);
        angular.forEach(responseString, function(value, key) {
           if(value.moStatus >= 0 || value.moStatus > 7 ){
            moStatus3 = moStatus3+1;
            $scope.moStatus3 = moStatus3;
           }
         });   
        angular.forEach(responseString, function(value, key) {
           if(value.moStatus >= 8 || value.moStatus > 10 ){
            moStatus6 = moStatus6+1;
            $scope.moStatus6 = moStatus6;
           }
         });
        angular.forEach(responseString, function(value, key) {
           if(value.moStatus >= 11){
            moStatus9 = moStatus9+1;
            $scope.moStatus9 = moStatus9;
           }
         });
      }, function (result) {
        alert("Error: get All Anchor Payment Status Details");
      });
    };
     $scope.getVendorPaymentStatusDetails();
    }

})();

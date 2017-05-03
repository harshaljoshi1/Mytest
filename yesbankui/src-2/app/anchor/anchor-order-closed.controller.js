(function () {
    'use strict';

    angular
        .module('yesBankAngular.vendor')
        .controller('AnchorOrderClosedController', AnchorOrderClosedController);

    /** @ngInject */
    function AnchorOrderClosedController($scope,AnchorProgramService) {
      $scope.loading=true;
    $scope.getAnchorOrderClosedDetails = function(){
      AnchorProgramService.getAnchorProgramDetails().then(function (result) {

        var responseString = result.data.result.message;
        responseString = responseString.replace(/'/g, '"');
        responseString = JSON.parse(responseString);
        $scope.loading=false;
        $scope.loopThroughAnchorProgramIds = responseString;
          $scope.bulletData = responseString;
          $scope.chart = [];
          $scope.chartOptions = [];

          angular.forEach(responseString, function (value, key) {
              debugger;
              if (value.status >= 0) {

                  $scope['options' + key] = {
                      chart: {
                          type: 'bulletChart',
                          duration: 500
                      },
                      title: {
                          enable: true,
                          text: responseString[key].anchorname
                      },
                      subtitle: {
                          enable: true,
                          text: responseString[key].vendorfname,
                          css: {
                              'text-align': 'center',
                              'margin': '10px 13px 0px 7px'
                          }
                      }
                  };
                  var invoice = JSON.stringify(responseString[key].invoices);
                if (invoice === "null" || invoice === null || typeof invoice === "undefined") {
                    status = responseString[key].status;
                } else {
                    var invoiceObject = JSON.parse(invoice)
                    status = responseString[key].status + invoiceObject[0].moStatus;
                };
                  $scope["data" + key] = {
                      // title options

                      "title": responseString[key].anchorprogramID,
                      "ranges": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15],
                      "measures": [status],
                      "markers": [status]
                  }
                  $scope.chart[key] = $scope["data" + key];
                  $scope.chartOptions[key] = $scope["options" + key];


              }

          });
          console.log($scope.chart);
        console.log("response is",responseString);

      }, function (result) {
        alert("Error: get All Anchor Order Closed Details");
      });
    };
     $scope.getAnchorOrderClosedDetails();
    }
    
})();

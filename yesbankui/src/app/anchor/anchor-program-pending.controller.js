(function () {
    'use strict';

    angular
        .module('yesBankAngular.vendor')
        .controller('AnchorProgramPendingController', AnchorProgramPendingController);

    /** @ngInject */
    function AnchorProgramPendingController($scope, AnchorProgramService) {
        AnchorProgramService.getAnchorProgramDetails().then(function (result) {
            var responseString = result.data.result.message;
            responseString = responseString.replace(/'/g, '"');
            responseString = JSON.parse(responseString);
            $scope.loopThroughAnchorProgramIds = responseString;
            $scope.bulletData = responseString;
            $scope.chart = [];
            $scope.chartOptions = [];



            angular.forEach(responseString, function (value, key) {

              var status;
              var invoice = JSON.stringify(responseString[key].invoices);
              if (invoice === "null" || invoice === null || typeof invoice === "undefined") {
                  status = responseString[key].status;
              } else {
                  var invoiceObject = JSON.parse(invoice)
                  status = responseString[key].status + invoiceObject[0].moStatus;



              };
              if(responseString[key].status==12) {status=15;};
              //var programStageCd =  responseString[key].status + invoiceObject[0].moStatus;

              var programStage;

              switch(status)
              {
                  case 0:
                      programStage="Program Template Created"
                      break;
                  case 1:
                      programStage="Program Initiated"
                      break;
                  case 2:
                      programStage="Anchor Places Purchase Order"
                      break;
                  case 3:
                      programStage="Vendor Acknowledges Purchase Order"
                      break;
                  case 4:
                      programStage="Vendor Creates Invoice Template"
                      break;
                  case 5:
                      programStage="Vendor Updates Invoice Details"
                      break;
                  case 6:
                      programStage="Vendor Transfers Invoice To Anchor"
                      break;
                  case 7:
                      programStage="Anchor Approves Invoice"
                      break;
                  case 8:
                      programStage="Anchor Authorizes Invoice Payment"
                      break;
                  case 9:
                      programStage="Vendor Requests Bank For Invoice Payment"
                      break;
                  case 10:
                      programStage="Bank Initiates Invoice Payment"
                      break;
                  case 11:
                      programStage="Maker Enters Invoice Payment Details"
                      break;
                  case 12:
                      programStage="Checker Approves Invoice Payment"
                      break;
                  case 13:
                      programStage="Vendor Receives Payment"
                      break;
                  case 14:
                      programStage="Invoice Payment Settled"
                      break;
                  case 15:
                      programStage="Anchor Program Closed"
                      break;
                  default:
                      programStage="Not defined"
              }

                    $scope['options' + key] = {
                    chart: {
                        type: 'bulletChart',
                        duration: 500
                    },
                    title: {
                        //enable: true,
                        //text: responseString[key].anchorname
                        enable: true,
                         text: "Anchor: "+ responseString[key].anchorname + "   |     Vendor: " + responseString[key].vendorfname + "   |     Stage: " + programStage,
                         css: {
                             'font-size':'14px'

                         }

                    },
                  /*  subtitle: {
                        enable: true,
                        text: responseString[key].vendorfname,
                        css: {
                            'text-align': 'center',
                            'margin': '10px 13px 0px 7px'
                        }
                    },*/
                };
                /*  var invoice = JSON.stringify(responseString[key].invoices);
                if (invoice === "null" || invoice === null || typeof invoice === "undefined") {
                    status = responseString[key].status;
                } else {
                    var invoiceObject = JSON.parse(invoice)
                    status = responseString[key].status + invoiceObject[0].moStatus +1;
                };
              */
                $scope["data" + key] = {
                    // title options

                    "title": responseString[key].anchorprogramID,
                    "ranges": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15],
                    "measures": [status],
                    "markers": [status]
                }
                $scope.chart[key] = $scope["data" + key];
                $scope.chartOptions[key] = $scope["options" + key];

//checking
            /*  if (value.status == 0) {
                    EmptyAPIds.push(value.anchorprogramID)
                    $scope.options = EmptyAPIds;
                    $scope.isDisabled = true;
                } *///checking

            });
            console.log($scope.chart);

            console.log("response is", responseString);

        }, function (result) {
            alert("Error: get Payment Initiation Details");
        });

//checking


    }

})();

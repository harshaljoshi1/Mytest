(function () {
    'use strict';

    angular
        .module('yesBankAngular.vendor')
        .controller('SettlementController', SettlementController);

    /** @ngInject */
    function SettlementController($scope,AnchorProgramService,apiCallService) {
    $scope.getQuerySettlementDetails = function(){
      $scope.loading = true;
 //     var ProgramId =null;
      AnchorProgramService.getPaymentIntiationDetails().then(function (result) {

        var responseString = result.data.result.message;
        responseString = responseString.replace(/'/g, '"');
        responseString = JSON.parse(responseString);
        $scope.loopThroughAnchorProgramIds = responseString;
        var loopThrough = $scope.loopThroughAnchorProgramIds;
        $scope.loading = false;
        $scope.receivedPayments=[];
        $scope.pendingPayments=[];

//start
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
                programStage="Program Template Created"
        }
            debugger;
            if (value.status >= 0) {

                $scope['options' + key] = {
                    chart: {
                        type: 'bulletChart',
                        duration: 500
                    },
                    title: {
                        enable: true,
                        text: "Anchor: "+ responseString[key].anchorname + "   |     Vendor: " + responseString[key].vendorfname + "   |     Stage: " + programStage,
                        css: {
                            'font-size':'14px'

                        }
                    },
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
//end


        for(var i=0;i<loopThrough.length;i++){

          if(loopThrough[i].mopaid){
            $scope.receivedPayments.push(loopThrough[i].approvedinvoiceAmount);
            $scope.pendingPayments.push(0);

          }
          else{
            $scope.pendingPayments.push(loopThrough[i].approvedinvoiceAmount);
            $scope.receivedPayments.push(0);

          }
        }


      }, function (result) {
        alert("Error: get Query Settlement Details");
      });

    $scope.getReverseStep = function(item){
    alert("the getReverseStep 12131 "+ item) ;
    if ( item.moStatus == 8){
    $scope.currentStep = item.moStatus;
    $scope.currentStage = "Invoice Payment Approved";
    $scope.previousStep = item.moStatus -1;
    $scope.previousStage = "Invoice Payment Pending Approval";
     }
    $scope.anchorProgram = item.poIDr;
    $scope.invoiceID = item.moID;
  }

        $scope.ConfirmSettlement = function(val){
            debugger;
            var config = {
                method: 'POST',
                url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/AnchorSettlement/update',
         //       url: 'http://10.0.45.87:1443/BlockChain/AnchorSettlement/update',
                data: {
                    "programdetails": {
                        "create": {
                            "programid": val.poIDr,
                            "userid": "Payment_C1",
                            "InvId":val.moID,
                            "AmountPaid":"98"
                        }
                    }
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-IBM-Client-Id': '174524e5-cec9-4305-a147-2eb41a900dda'
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            };

            apiCallService
                .apiCallToServer(config)
                .then(function (response) {


                }, function (error) {
                    console.log(error);
                });

        }
    };
     $scope.getQuerySettlementDetails();
    }

})();

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

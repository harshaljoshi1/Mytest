(function () {
  'use strict';

  angular
    .module('yesBankAngular.payment')
    .controller('PaymentInitiationController', PaymentInitiationController);
  /** @ngInject */
  function PaymentInitiationController($scope, $state, AnchorProgramService, apiCallService, urls) {
    $scope.initiatePaymentPanel=false;
    $scope.select = {optradio: ''};
    $scope.loading=true;
    $scope.getPaymentInitiationDetails = function () {
      AnchorProgramService.getInvoiceDetailswithYBL().then(function (result) {
        debugger;
        var responseString = result.data.result.message;
        responseString = responseString.replace(/'/g, '"');
        responseString = JSON.parse(responseString);
        var moStatus7 = 0;
        var moStatus7Amt = 0;
        var moStatus7POAmt = 0;
        debugger;
        $scope.loading=false;
        $scope.loopThroughAnchorProgramIds = responseString;
         angular.forEach(responseString, function(value, key) {
            if(value.moStatus == 7){
            moStatus7 = moStatus7+1;
            moStatus7Amt = value.moAmount +moStatus7Amt;
            moStatus7POAmt = value.anchorpoamount +moStatus7POAmt;
            $scope.moStatus7 = moStatus7;
            $scope.moStatus7Amt = moStatus7Amt;
            $scope.moStatus7POAmt = moStatus7POAmt;
            $scope.ProgramId = value.poIDr;
           }
         });

        debugger;
        console.log("response is", responseString);

      }, function (result) {
        alert("Error: get Payment Initiation Details");
      });
    };
  $scope.getPaymentInitiationDetails();
  $scope.getReverseStep = function(ProgramId){

    if ( ProgramId.moStatus == 7){
    $scope.currentStep = ProgramId.moStatus;
    $scope.currentStage = "Invoice Payment Approved";
    $scope.previousStep = ProgramId.moStatus -1;
    $scope.previousStage = "Invoice Payment Pending Approval";
     }
    $scope.anchorProgram = ProgramId.poIDr;
    $scope.invoiceID = ProgramId.moID;
  }

  $scope.IntiatePayment = function(ProgramId){
      var text1 = "TX", text2 = "", remainingDigits = "0123456789";

      for (var j = 0; j < 7; j++) {
        text2 += remainingDigits.charAt(Math.floor(Math.random() * remainingDigits.length));
      }

      $scope.uniqueRequestNo = ProgramId.poIDr + ProgramId.moID;

      debugger;
      $scope.vendorFname = ProgramId.vendorFname;
      $scope.vendorBank = ProgramId.vendorBank;
      $scope.venDorbank= ProgramId.venDorbank;
      $scope.IFSCode = ProgramId.venDorbank;
      $scope.ProgramId = ProgramId.poIDr;
      $scope.InvId = ProgramId.moID;
    //  $scope.InvId = ProgramId.invoiceRaisedTime;
      /*$scope.InvAmount = ProgramId.approvedinvoiceAmount;*/


      AnchorProgramService.getRecievableAmount(ProgramId).then(function (result) {
        $scope.loading=true;
        debugger;
        var responseString = result.data.transferResponse;
        debugger;
        $scope.InterestPayable = responseString.InterestPayable;
        $scope.AmountReceivable = responseString.AmountReceivable;
        $scope.RateofDiscountedInterest = responseString.RateofDiscountedInterest;
        $scope.TenureofDiscountedInterest = responseString.TenureofDiscountedInterest;

        $scope.initiatePaymentPanel=true;
        $scope.loading=false;

      }, function (result) {
        alert("Error: Initiate payment  Details");
      });
debugger;
    };
    $scope.getPaymentDetails = function (val) {
      debugger;
      console.log("value ", val);
      if (val != null) {
        var config = {
          method: 'POST',
          url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/BlockChain/ProgramDetails/Query',
     //     url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Query',
          data: {
            "programdetails": {
              "create":{
                "programid":val.poIDr,
                "userid":"YBL"
                /*"InvId":val.moID*/
              }}
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
            var ProgramDetails =response.result.message;
            ProgramDetails=JSON.parse(ProgramDetails);
            debugger;
            $scope.CustomerID = ProgramDetails.customerID;
            $scope.VendorPhone = ProgramDetails.vendorphone;
            $scope.Vendoremail = ProgramDetails.vendoremail;
            $scope.Vendoraddress = ProgramDetails.vendoraddress;
            $scope.Anchoraccountno = ProgramDetails.anchoraccountno;
            $scope.Vendoraccountno= ProgramDetails.vendoraccountno;


          }, function (error) {
            console.log(error);
          });
      }
      else {
        console.log('null');
        alert('reference number is not specified');
      }
    };




    $scope.fundTransfer = function (fund, RemittertoBeneNote, PaymentMode) {
      var AmountString = $scope.AmountReceivable;
      AmountString = AmountString.toString();
      var InVoiceID = $scope.InvId;
      var poIDr = $scope.ProgramId;
  //  alert("Calling maker" + poIDr);
      debugger;
      var config = {
        method: 'POST',
        url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/Maker',
   //     url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Maker',
        data: {
          "programdetails": {
            "create": {
              "userid": "Payment_M1",
              "programid": poIDr,
              "InvId": InVoiceID,
              "SignedAmount":AmountString,
              "TransferType":PaymentMode
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
          if(response.ErrorCode != null){
          alert("Transfer to Checker Failed");

          }
         else{
            debugger;
            alert("Successfully transferred to Checker");
            location.reload();
          /*debugger;
            AnchorProgramService.getUTRDetails(response,$scope.poIDr,$scope.InVoiceID).then(function (result) {
          debugger;
              alert('UTR suceess');

            }, function (result) {
              alert("Error: UTR");
            });
            $scope.InVoiceID = '';
            $scope.poIDr = '';*/

          }

        }, function (error) {
          alert('Payment is not successful');
        });
    };


  }

})();

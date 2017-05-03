(function () {
  'use strict';

  angular
    .module('yesBankAngular.payment')
    .controller('AnchorPendingPaymentController', AnchorPendingPaymentController);
  /** @ngInject */
  function AnchorPendingPaymentController($scope, $state, AnchorProgramService, apiCallService) {
    $scope.PaymentInitiationPanel = false;
    $scope.select = {optradio: ''};
    $scope.loading = true;
    $scope.getAnchorPendingPaymentDetails = function () {
      AnchorProgramService.getPaymentIntiationDetails().then(function (result) {
        var responseString = result.data.result.message;
        var invPendingCnt = 0;
        var invProcCnt = 0;
        var moReceivableAmount = 0;
        responseString = responseString.replace(/'/g, '"');
        responseString = JSON.parse(responseString);
        $scope.loading = false;
        $scope.loopThroughAnchorProgramIds = responseString;
        debugger;
          angular.forEach(responseString, function(value, key) {
           if(value.moStatus == 10 ){
             moReceivableAmount = value.moReceivableAmount + moReceivableAmount;
              $scope.moReceivablePendAmt = moReceivableAmount;
              invPendingCnt = invPendingCnt + 1;
              $scope.invPendingCnt = invPendingCnt;
           }
         });   
          angular.forEach(responseString, function(value, key) {
   //        if(value.moStatus == 4 || value.moStatus == 8 || value.moStatus == 9 ){
             if(value.moStatus >= 3  || value.moStatus < 7 ){
             moReceivableAmount = value.approvedinvoiceAmount + moReceivableAmount;
              $scope.moReceivableProcAmt = moReceivableAmount;
              invProcCnt = invProcCnt + 1 ;
              $scope.invProcCnt = invProcCnt;
           }
         });   
      
      }, function (result) {
        alert("Error: get Pending Payment Details");
      });
    };
    $scope.getAnchorPendingPaymentDetails();


    $scope.AnchorInitiatePayment = function (programId) {
      var text1 = "", text2 = "", firstTwoDigits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", remainingDigits = "0123456789";
      for (var i = 0; i < 2; i++) {
        text1 += firstTwoDigits.charAt(Math.floor(Math.random() * firstTwoDigits.length));
      }
      for (var j = 0; j < 7; j++) {
        text2 += remainingDigits.charAt(Math.floor(Math.random() * remainingDigits.length));
      }
      $scope.ProgramId = programId.poIDr;
      $scope.InvId = programId.moID;

      $scope.uniqueRequestNo = text1 + text2;
      debugger;
      AnchorProgramService.getRecievableAmountforAnchor(programId).then(function (result) {
        $scope.PaymentInitiationPanel = true;
        debugger;
        var responseString = result.data.transferResponse.ListofTransactions;

        $scope.AmountPayable = responseString.AmountPayable;
        $scope.AccruedInterestPayable = responseString.AccruedInterestPayable;
        $scope.AccruedInterestReceivable = responseString.AccruedInterestReceivable;



      }, function (result) {
        alert("Error: Initiate payment  Details");
      });

    };


    $scope.anchorfundTransfer = function (fund, RemittertoBeneNote) {
      $scope.InVoiceID = fund.moID;
      $scope.poIDr = fund.poIDr;

      debugger;
      var config = {
        method: 'POST',
        url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/AnchorSettlement/transfer',
   //     url: 'http://10.0.45.87:1443/BlockChain/AnchorSettlement/transfer',
        data: {
          "transfer": {
            "ProgramId": $scope.poIDr,
            "InvoiceId": $scope.InVoiceID,
            "AmountPayable": $scope.AmountPayable,
            "transactionId": $scope.uniqueRequestNo,
            "AccruedInterestReceivableAmount": $scope.AccruedInterestReceivable,
            "AccruedInterestPayableAmount":  $scope.AccruedInterestPayable ,
            "RemittertoBeneNote": RemittertoBeneNote
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
          alert('Anchor Pending Payment successful');

        }, function (error) {
          alert('Anchor Pending Payment not successful');
        });
    };
  }
})();

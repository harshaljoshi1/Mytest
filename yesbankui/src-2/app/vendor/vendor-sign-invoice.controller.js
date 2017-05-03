(function () {
  'use strict';

  angular
    .module('yesBankAngular.vendor')
    .controller('VendorSignInvoiceController', VendorSignInvoiceController);

  /** @ngInject */
  function VendorSignInvoiceController($scope, $state, AnchorProgramService, apiCallService) {

    $scope.select = { optradio: '' };

    $scope.okSelect = function () {

      $state.go('app.modify-anchor-sign-purchase-order');
    };
    // action definition when Cancel button in clicked
    $scope.cancelSelect = function () {
      $state.go('app.stats');
    };
    $scope.loading = true;
    $scope.getAllAnchorPODetails = function () {
      AnchorProgramService.getAnchorProgramDetails().then(function (result) {
        var responseString = result.data.result.message;
        responseString = responseString.replace(/'/g, '"');
        responseString = JSON.parse(responseString);
        $scope.loading = false;
        $scope.loopThroughAnchorProgramIds = responseString;
        angular.forEach(responseString, function (value, key) {
        var invoice = JSON.stringify(responseString[key].invoices);
                if (invoice === "null" || invoice === null || typeof invoice === "undefined") {
                    status = responseString[key].status;
                } else {
                    var invoiceObject = JSON.parse(invoice)
                    status = responseString[key].status + invoiceObject[0].moStatus +1;
        $scope.loopThroughInvoice = invoiceObject;
                };
         $scope.invStatus = status;     
         }); 


    /* var invoice = JSON.stringify(responseString[key].invoices);
       if (invoice === "null" || invoice === null || typeof invoice === "undefined") {
            status = responseString[key].status;
        } else {
                let invoiceObject = JSON.parse(invoice)
          status = responseString[key].status + invoiceObject[0].moStatus +1;
          };
      */


        debugger;
        console.log("response is", responseString);
      }, function (result) {
        alert("Error: get All Anchor PO Details");
      });
    };
    $scope.getAllAnchorPODetails();
    $scope.renderVendorSignInvoiceDetails = function (val) {
      var text1 = "", text2 = "", firstTwoDigits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", remainingDigits = "0123456789";
      for (var i = 0; i < 2; i++) {
        text1 += firstTwoDigits.charAt(Math.floor(Math.random() * firstTwoDigits.length));
      }
      for (var j = 0; j < 7; j++) {
        text2 += remainingDigits.charAt(Math.floor(Math.random() * remainingDigits.length));
      }
      $scope.InvId = text1 + text2;
      var VPO = {
        method: 'POST',
        url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/VendorPO',
 //       url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/VendorPO',
        data: {
          "programdetails": {
            "create": {
              "programid": val,
              "userid": "MRF"
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
        .apiCallToServer(VPO)
        .then(function (response) {
          alert('VPO Success')

        }, function (error) {
          alert('VPO Error')
        });




      console.log("value ", val);
      if (val != null) {

        $state.go('app.modify-vendor-sign-invoice',{programId:val,InvId:$scope.InvId});
      }
      else {
        console.log('null');
        alert('reference number is not specified');
      }
    };



  }
})();

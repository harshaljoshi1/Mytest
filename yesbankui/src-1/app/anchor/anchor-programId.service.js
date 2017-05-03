(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .service('AnchorProgramService', AnchorProgramService);

  function AnchorProgramService($http, urls) {

    var factory = {
      createAnchorProgramId: function (anchorProgramId) {
        var data = $http({
          method: 'POST', url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/BlockChain/ProgramDetails/Create',
 //         method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Create',
          data: {
            "programdetails": {
              "create":{
                "userid":"YBL",
                "programid":anchorProgramId,
                "role":"regulator"
              }}
            },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      updateAnchorProgramId: function (data1,data2,data3) {
        var data = $http({
          method: 'POST', url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/BlockChain/ProgramDetails/Update',
   //    method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Update',
          data: {
            "programdetails": {
              "create":{
                "userid":"YBL",
                "programid":data3,
                "role":"YBL",
                "anchorid":data1,
                "vendorid":data2,
                "stage1":"stage1"
              }}
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getNetworkPeers: function () {
        var data = $http({
          method: 'GET', url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/network/peers',
        //  method: 'GET', url: 'https://10.0.45.87:1443/BlockChain2/Gateway/network/peers',
               data: {

          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getAnchorProgramDetails: function () {
        var data = $http({
          method: 'POST', url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/BlockChain/ProgramDetails/Query',
 //         method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Query',
          data: {
            "programdetails": {
              "create":{
                "programid":'ALL',
                "userid":"YBL"
              }}
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getInvoiceDetails: function () {
        var data = $http({
          method: 'POST', url: ' https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/QueryInv',
 //         method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/QueryInv',
          data: {
            "programdetails": {
              "create":{
                "programid":'ALL',
                "userid":"YBL"
              }}
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getInvoiceDetailswithYBL: function () {
        var data = $http({
          method: 'POST', url: ' https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/QueryInv',
 //         method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/QueryInv',
          data: {
            "programdetails": {
              "create":{
                "programid":'ALL',
                "userid":"YBL"
              }}
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getInvoiceDetailswithMRF: function () {
        var data = $http({
          method: 'POST', url: ' https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/QueryInv',
       //         method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/QueryInv',
    data: {
            "programdetails": {
              "create":{
                "programid":'ALL',
                "userid":"Vendor_2"
              }}
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getPaymentIntiationDetails: function () {
        var data = $http({
          method: 'POST', url: ' https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/QueryInv',
        //         method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/QueryInv',
      data: {
            "programdetails": {
              "create":{
                "programid":'ALL',
                "userid":"YBL"
              }}
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getRecievableAmount: function (ProgramId) {
        debugger;
        var SignedAmount = ProgramId.approvedinvoiceAmount;
        SignedAmount = SignedAmount.toString();
        var data = $http({
          method: 'POST', url: ' https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/VendorSettlement/getDiscountedAmount',
        // method: 'POST', url: ' https://10.0.45.87:1443/BlockChain/VendorSettlement/getDiscountedAmount',
                 data: {
          "transfer": {
          "SignedAmount": SignedAmount,
            "ProgramId": ProgramId.poIDr,
            "InvoiceId": ProgramId.moID
        }


      },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getRecievableAmountforAnchor: function (ProgramId) {
        debugger;
        var SignedAmount = ProgramId.approvedinvoiceAmount;
        SignedAmount = SignedAmount.toString();
        var data = $http({
          method: 'POST', url: ' https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/AnchorSettlement/getTransactionalDetails',
      //   method: 'POST', url: ' https://10.0.45.87:1443/BlockChain/AnchorSettlement/getTransactionalDetails',
               data: {

            "transfer": {
              "SignedAmount": SignedAmount,
              "ProgramId": ProgramId.poIDr,
              "InvoiceId": ProgramId.moID
            }


          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getUTRDetails: function (val1,val3,val2) {
        debugger;
        var data = $http({
          method: 'POST', url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/PaymentInv',
     //     method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/PaymentInv',
          data: {
            "programdetails": {
              "create":{
                "programid":val3,
                "userid":"Payment_C1",
                "InvId":val2,
                "UTRNo":val1.transferResponse.TransactionDetail.BankReferenceNo
               /* "Date":val4*/
              }}
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getCheckerApprove: function (val1,val2) {
        alert(" the value for CheckerApprove "+val1);
        debugger;
        var data = $http({
          method: 'POST', url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/CheckerApprove',
    //      method: 'POST', url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/CheckerApprove',
          data: {
            "programdetails": {
              "create":{
                "programid":val1,
                "userid":"Payment_C1",
                "InvId":val2

              }}
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      }


    };
    return factory;
  }
})();

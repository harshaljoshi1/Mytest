(function () {
    'use strict';

    angular
        .module('yesBankAngular.vendor')
        .controller('VendorPaymentStatusController', VendorPaymentStatusController);

    /** @ngInject */
    function VendorPaymentStatusController($scope, AnchorProgramService,apiCallService) {
        $scope.loading = true;
        $scope.initiatePaymentPanel=false;
        $scope.select = {optradio: ''};
        $scope.getVendorPaymentStatusDetails = function () {
            AnchorProgramService.getInvoiceDetailswithMRF().then(function (result) {

                var responseString = result.data.result.message;
                responseString = responseString.replace(/'/g, '"');
                responseString = JSON.parse(responseString);
                var activePoCnt = 0;
                var activeInvCnt = 0;
                var moAmount = 0;
                var paidInvCnt = 0;
                var paidAmount = 0;
                
                $scope.loading = false;
                $scope.loopThroughAnchorProgramIds = responseString;
                var loopThrough = $scope.loopThroughAnchorProgramIds;
                $scope.receivedPayments = [];
                $scope.pendingPayments = [];
                alert("the value"+responseString);
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

                angular.forEach(responseString, function(value, key) {
                if(value.moStatus >= 2 && value.moStatus<10 ){
                activePoCnt = activePoCnt + 1;
                 $scope.activePoCnt = activePoCnt;
                  }
                if(value.moStatus >= 3 && value.moStatus<10 ){
                activeInvCnt = activeInvCnt + 1;
                $scope.activeInvCnt = activeInvCnt;
                moAmount = value.moAmount + moAmount ;
                $scope.moAmount = moAmount;
                  }
                if(value.moStatus ==  10 ){
                paidInvCnt = paidInvCnt + 1;
                 $scope.paidInvCnt = paidInvCnt;
                 paidAmount = value.moReceivableAmount + paidAmount;
                 $scope.paidAmount = paidAmount;
                  }  
               });   
         
            angular.forEach(responseString, function(value, key) {
            if(value.moStatus == 4 || value.moStatus == 8 || value.moStatus == 9 ){
             moReceivableAmount = value.moReceivableAmount + moReceivableAmount;
              $scope.moReceivableProcAmt = moReceivableAmount;
              invProcCnt = invProcCnt + 1 ;
              $scope.invProcCnt = invProcCnt;
            alert("anchorpoamount "+ invProcCnt);
            }
         });   
          for (var i = 0; i < loopThrough.length; i++) {

                    if (loopThrough[i].mopaid) {
                        $scope.receivedPayments.push(loopThrough[i].approvedinvoiceAmount);
                        $scope.pendingPayments.push(0);
                    }
                    else {
                        $scope.pendingPayments.push(loopThrough[i].approvedinvoiceAmount);
                        $scope.receivedPayments.push(0);

                    }

                }
                var sum1 = 0;
                for (var k = 0; k < $scope.receivedPayments.length; k++) {
                    sum1 += $scope.receivedPayments[k];

                }
                $scope.RPtotal = sum1;

                var sum2 = 0;
                for (var l = 0; l < $scope.pendingPayments.length; l++) {
                    sum2 += $scope.pendingPayments[l];
                    debugger;

                }
                $scope.PPtotal = sum2;


            }, function (result) {
                alert("Error: get All Vendor Payment Status Details");
            });
        };
        $scope.getVendorPaymentStatusDetails();

        $scope.DrawDownDetails = function(ProgramId){
            var text1 = "", text2 = "", firstTwoDigits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", remainingDigits = "0123456789";
            for (var i = 0; i < 2; i++) {
                text1 += firstTwoDigits.charAt(Math.floor(Math.random() * firstTwoDigits.length));
            }
            for (var j = 0; j < 7; j++) {
                text2 += remainingDigits.charAt(Math.floor(Math.random() * remainingDigits.length));
            }

            $scope.uniqueRequestNo = ProgramId.poIDr + ProgramId.moID;

            debugger;
            $scope.vendorFname = ProgramId.vendorFname;
            $scope.vendorBank = ProgramId.vendorBank;
            $scope.IFSCode = ProgramId.venDorbank;
            $scope.ProgramId = ProgramId.poIDr;
            $scope.InvId = ProgramId.moID;
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



        $scope.PassToMaker = function (fund,RemittertoBeneNote) {
debugger;
            $scope.InVoiceID = fund.moID;
            $scope.poIDr = fund.poIDr;
            debugger;
            var config = {
                method: 'POST',
                url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/ToMaker',
            //    url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails//ToMaker',
                data: {
                    "programdetails": {
                        "create": {
                            "userid": "MRF",
                            "programid": $scope.poIDr,
                            "InvId": $scope.InVoiceID
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
                    if(response.Fault){
                        alert(response.Fault.Reason);
                    }
                    else{
                        debugger;
                        alert(response.result.status);

                       /* AnchorProgramService.getUTRDetails(response,$scope.poIDr,$scope.InVoiceID).then(function (result) {
                            debugger;
                            alert('UTR suceess');

                        }, function (result) {
                            alert("Error: UTR");
                        });*/
                        $scope.InVoiceID = '';
                        $scope.poIDr = '';

                    }

                }, function (error) {
                    alert('ToMaker is not successful');
                });
        };

    }

})();

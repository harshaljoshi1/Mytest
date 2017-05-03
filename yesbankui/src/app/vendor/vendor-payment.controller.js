(function () {
    'use strict';

    angular

       .module('yesBankAngular.vendor')
        .controller('VendorPaymentController', VendorPaymentController);
    /** @ngInject */
    function VendorPaymentController($scope, $state, AnchorProgramService, apiCallService, urls) {
        $scope.initiatePaymentPanel = false;
        $scope.select = {optradio: ''};
        $scope.loading = true;


        $scope.getPaymentInitiationDetails = function () {
            AnchorProgramService.getInvoiceDetailswithYBL().then(function (result) {
                debugger;
                var responseString = result.data.result.message;
                responseString = responseString.replace(/'/g, '"');
                responseString = JSON.parse(responseString);

                debugger;
                $scope.loading = false;
                $scope.loopThroughAnchorProgramIds = responseString;
                $scope.bulletData = responseString;
                $scope.chart = [];
                $scope.chartOptions = [];

                angular.forEach(responseString, function(value, key) {

                    var status = responseString[key].moStatus+3;
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



                    $scope['options'+key] = {
                        chart: {
                            type: 'bulletChart',
                            duration: 500
                        },
                        title: {
                            enable: true,
                            text: "Anchor: "+ responseString[key].anchorname + "   |     Vendor: " + responseString[key].vendorFname + "   |     Stage: " + programStage,
                            css: {
                                'font-size':'14px'

                            }
                        },

                    };

                    $scope["data" + key] = {
                        // title options

                        "title": responseString[key].poIDr,
                        "ranges": [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15],
                        "measures": [status],
                        "markers": [status ]
                    }
                    $scope.chart[key] = $scope["data" + key];
                    $scope.chartOptions[key] = $scope["options" + key];

            });
                console.log($scope.chart);

                debugger;
                console.log("response is", responseString);

            }, function (result) {
       //         alert("Error: get Vendor Payment Details");
            });
        };

        $scope.getPaymentInitiationDetails();

        $scope.IntiatePayment = function (ProgramId) {
/*            var text1 = "TX", text2 = "", remainingDigits = "0123456789";

            for (var j = 0; j < 7; j++) {
                text2 += remainingDigits.charAt(Math.floor(Math.random() * remainingDigits.length));
            }
*/
            $scope.uniqueRequestNo = ProgramId.poIDr + ProgramId.moID;

            debugger;
            $scope.PaymentMode = ProgramId.paymentChannel;
            $scope.vendorFname = ProgramId.vendorFname;
            $scope.vendorBank = ProgramId.vendorBank;
            $scope.venDorbank= ProgramId.venDorbank;
            $scope.IFSCode = ProgramId.venDorbank;
            $scope.ProgramId = ProgramId.poIDr;
            $scope.InvId = ProgramId.moID;
            /*$scope.InvAmount = ProgramId.approvedinvoiceAmount;*/


            AnchorProgramService.getRecievableAmount(ProgramId).then(function (result) {
                $scope.loading = true;
                debugger;
                var responseString = result.data.transferResponse;
                debugger;
                $scope.InterestPayable = responseString.InterestPayable;
                $scope.AmountReceivable = responseString.AmountReceivable;
                $scope.RateofDiscountedInterest = responseString.RateofDiscountedInterest;
                $scope.TenureofDiscountedInterest = responseString.TenureofDiscountedInterest;

                $scope.initiatePaymentPanel = true;
                $scope.loading = false;

            }, function (result) {
                alert("Error: Initiate payment  Details");
            });
            debugger;
        };

        $scope.getPaymentDetails = function (ProgramId) {
            debugger;
            console.log("value ", ProgramId);
            if (ProgramId != null) {
                var config = {
                    method: 'POST',
                    url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/BlockChain/ProgramDetails/Query',
               //     url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Query',

                    data: {
                        "programdetails": {
                            "create": {
                                "programid": ProgramId.poIDr,
                                "userid": "YBL"
                                /*"InvId":val.moID*/
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
                        var ProgramDetails = response.result.message;
                        ProgramDetails = JSON.parse(ProgramDetails);
                        debugger;
                        $scope.CustomerID = ProgramDetails.customerID;
                        $scope.VendorPhone = ProgramDetails.vendorphone;
                        $scope.Vendoremail = ProgramDetails.vendoremail;
                        $scope.Vendoraddress = ProgramDetails.vendoraddress;
                        $scope.Anchoraccountno = ProgramDetails.anchoraccountno;
                        $scope.Vendoraccountno = ProgramDetails.vendoraccountno;

                    }, function (error) {
                        console.log(error);
                    });
            }
            else {
                console.log('null');
                alert('reference number is not specified');
            }
        };

        $scope.checkerApprove = function(ProgramId){
            debugger;
             var InVoiceID = $scope.InvId;
            var poIDr = $scope.ProgramId;

            AnchorProgramService.getCheckerApprove(poIDr,InVoiceID).then(function (result) {
                debugger;
            //    alert('get Checker Approve suceess');

            }, function (result) {
                alert("Error: get Checker Approve");
            });

        };

        $scope.fundTransfer = function (fund, RemittertoBeneNote, PaymentMode) {
            var StringAmount = $scope.AmountReceivable;
            StringAmount = StringAmount.toString();
            var InVoiceID = $scope.InvId;
            var poIDr = $scope.ProgramId;
             var DiscountedAmount= $scope.InterestPayable;
            DiscountedAmount =DiscountedAmount.toString();
            var ReceivableAmount= $scope.AmountReceivable;
            ReceivableAmount =ReceivableAmount.toString();
            debugger;
            var config = {
                method: 'POST',
                url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/VendorSettlement/transfer',
          //      url: 'https://10.0.45.87:1443/BlockChain/VendorSettlement/transfer',
                data: {
                    "transfer": {
                        "ProgramId": poIDr,
                        "InvoiceId": InVoiceID,
                        "ReceivableAmount": ReceivableAmount,
                        "transactionId": $scope.uniqueRequestNo ,
                        "DiscountedAmount": DiscountedAmount,
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
                    if (response.Fault) {
                        alert(response.Fault.Reason);
                    }
                    else {
                        debugger;
                        alert('successful transaction');
                        AnchorProgramService.getUTRDetails(response,poIDr,InVoiceID).then(function (result) {
                            debugger;
                            alert('UTR suceess for transaction Response    :'+poIDr+InVoiceID);
                          location.reload();

                        }, function (result) {
                            alert('Error: UTR for transaction Response    :'+poIDr+InVoiceID);

                        });
                        $scope.InVoiceID = '';
                        $scope.poIDr = '';


                    }

                }, function (error) {
                    alert('Payment is not successful');
                });
        };

  }
})();

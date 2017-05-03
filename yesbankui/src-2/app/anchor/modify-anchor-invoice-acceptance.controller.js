(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .controller('ModifyAnchorInvoiceAcceptanceController', ModifyAnchorInvoiceAcceptanceController);

  /** @ngInject */
  function ModifyAnchorInvoiceAcceptanceController($scope, Upload, apiCallService, $stateParams) {
    console.log("stateParams are", $stateParams.poIDr);
    console.log("stateParams are", $stateParams.moID);
    var anchorConfig = {
      method: 'POST',
      url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/BlockChain/ProgramDetails/Query',
   //   url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Query',
      data: {
        "programdetails": {
          "create": {
            "programid": $stateParams.poIDr,
            "userid": "YBL"
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
      .apiCallToServer(anchorConfig)
      .then(function (response) {
        var ProgramDetails = response.result.message;
        ProgramDetails = JSON.parse(ProgramDetails);
          var BulletArray = [];
          BulletArray.push(ProgramDetails);
          $scope.bulletData = BulletArray;
          $scope.chart = [];
          $scope.chartOptions = [];

          angular.forEach(BulletArray, function (value, key) {
            debugger;
            if (value.status >= 0) {

              $scope['options' + key] = {
                chart: {
                  type: 'bulletChart',
                  duration: 500
                },
                title: {
                  enable: true,
                  text: BulletArray[key].anchorname
                },
                subtitle: {
                  enable: true,
                  text: BulletArray[key].vendorfname,
                  css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                  }
                }
              };
               var invoice = JSON.stringify(BulletArray[key].invoices);
                if (invoice === "null" || invoice === null || typeof invoice === "undefined") {
                    status = BulletArray[key].status+3;
                } else {
                    var invoiceObject = JSON.parse(invoice)
                    status = BulletArray[key].status + invoiceObject[0].moStatus +3;
                };
              $scope["data" + key] = {
                // title options

                "title": BulletArray[key].anchorprogramID,
                "ranges": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15],
                "measures": [status],
                "markers": [status]
              }
              $scope.chart[key] = $scope["data" + key];
              $scope.chartOptions[key] = $scope["options" + key];

              if (value.status == 0) {
                debugger;
                EmptyAPIds.push(value.anchorprogramID)
                $scope.options = EmptyAPIds;
                $scope.isDisabled = true;

              }
            }

          });
          console.log($scope.chart);
        debugger;
        $scope.anchorProgramId = {
          Vendorname: ProgramDetails.vendorfname,
          InvId: ProgramDetails.invoices[0].moID,
          SignedAmount: ProgramDetails.invoices[0].approvedinvoiceAmount,
          ChallanNumber: ProgramDetails.invoices[0].invoiceid,
          InvAmount: ProgramDetails.invoices[0].moAmount,
          AnchorProgramId: ProgramDetails.anchorprogramID,
          anchorInterestPeriod: ProgramDetails.anchorgraceinterestperiod,
          poAmount: ProgramDetails.anchorpoamount,
          anchorInterest: ProgramDetails.anchorinterest,
          anchorGraceInterest: ProgramDetails.anchorgraceinterest,
          anchorPenalInterest: ProgramDetails.anchorpenalinterest
        };
        debugger;
      }, function (error) {
        console.log(error);
      });
    var pdfConfig = {
      method: 'POST',
      url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/QueryInv',
   //   url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/QueryInv',
      data: {
        "programdetails": {
          "create": {
            "programid": $stateParams.poIDr,
            "userid": "YBL",
            "InvId": $stateParams.moID
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
      .apiCallToServer(pdfConfig)
      .then(function (response) {
        var ProgramDetails = response.result.message;
        ProgramDetails = JSON.parse(ProgramDetails);
        debugger;
        $scope.venodrPDF = {
          "invoiceimage": ProgramDetails.invoiceimage
        };
        debugger;
        var ImgDocParser = $scope.venodrPDF.invoiceimage;


          var Imageconfig = {
            method: 'POST',
       url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/QueryImage',
   //       url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/QueryImage',
            data: {
              "programdetails": {
                "create": {
                  "userid": "MRF",
                  "HashKey": ImgDocParser

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
              .apiCallToServer(Imageconfig)
              .then(function (response) {
                debugger;
                $scope.convertedPOimage = response.Image;
                var pdfAsDataUri = $scope.convertedPOimage; // shortened
                var pdfAsArray = convertDataURIToBinary(pdfAsDataUri);
                PDFJS.getDocument(pdfAsDataUri).then(function (pdf) {
                  var numPages = 0;
                  thePDF = pdf;
                  numPages = pdf.numPages;

                  pdf.getPage(1).then(handlePages);
                  pdf.getPage(1).then(handlePages1);
                });


                function convertDataURIToBinary(dataURI) {
                  debugger;
                  var BASE64_MARKER = ';base64,';
                  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
                  var base64 = dataURI.substring(base64Index);
                  var raw = window.atob(base64);
                  var rawLength = raw.length;
                  var array = new Uint8Array(new ArrayBuffer(rawLength));

                  for (var i = 0; i < rawLength; i++) {
                    array[i] = raw.charCodeAt(i);
                  }
                  return array;
                }

                debugger;

                var currPage = 1; //Pages are 1-based not 0-based
                var numPages = 0;
                var thePDF = null;


                function handlePages(page) {
                  var viewport = page.getViewport(1);
                  var canvas = document.createElement("canvas");
                  canvas.style.display = "block";
                  var context = canvas.getContext('2d');
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;
                  page.render({canvasContext: context, viewport: viewport});
                  document.getElementById('myCanvas').appendChild(canvas);
                  currPage++;
                  if (thePDF !== null && currPage <= numPages) {
                    thePDF.getPage(currPage).then(handlePages);
                  }
                }

                function handlePages1(page) {

                  var viewport = page.getViewport(1);
                  var canvas = document.createElement("canvas");
                  canvas.style.display = "block";
                  var context = canvas.getContext('2d');
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;
                  page.render({canvasContext: context, viewport: viewport});
                  document.getElementById('myCanvas1').appendChild(canvas);
                  currPage++;
                  if (thePDF !== null && currPage <= numPages) {
                    thePDF.getPage(currPage).then(handlePages1);
                  }
                }



              }, function (error) {

              });

      }, function (error) {
        console.log(error);
      });

    $scope.modifyAnchorInvoice = function (modifiedAnchorProgramId) {

      debugger;
      var config = {
        method: 'POST',
       url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/AnchorInv',
     //  url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/AnchorInv',
        data: {
          "programdetails": {
            "create": {
              "userid": "YBL",
              "programid": modifiedAnchorProgramId.AnchorProgramId,
              "SignedAmount": modifiedAnchorProgramId.SignedAmount,
              "InvId": modifiedAnchorProgramId.InvId
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
          debugger;
          alert('acceptance successful');
          console.log(response);
        }, function (error) {
          alert('Acceptance failed');
        });


      debugger;
    /*  var configObj = {
        method: 'POST',
        url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/ToMaker',
        data: {
          "programdetails": {
            "create": {
              "userid": "Payment_M1",
              "programid": modifiedAnchorProgramId.AnchorProgramId,
              "InvId": modifiedAnchorProgramId.InvId
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
        .apiCallToServer(configObj)
        .then(function (response) {
          alert('payment call successful');
        }, function (error) {
          alert('payment call not successful');
        });*/

    };
    console.log("entered modify anchor invoice acceptance controller");

  }
})();

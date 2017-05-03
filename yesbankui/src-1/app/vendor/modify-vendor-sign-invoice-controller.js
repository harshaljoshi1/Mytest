(function () {
    'use strict';

    angular
        .module('yesBankAngular.anchor')
        .controller('ModifyVendorSignInvoiceController', ModifyVendorSignInvoiceController);

    /** @ngInject */
    function ModifyVendorSignInvoiceController($scope, Upload, apiCallService, $stateParams) {

        var VendorConfig = {
            method: 'POST',
            url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/BlockChain/ProgramDetails/Query',
      //      url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Query',
            data: {
                "programdetails": {
                    "create": {
                        "programid": $stateParams.programId,
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
            .apiCallToServer(VendorConfig)
            .then(function (response) {
                debugger;
                var InvoiceDetails = response.result.message;
                InvoiceDetails = JSON.parse(InvoiceDetails);
                console.log("InvoiceDetails are", InvoiceDetails);
                debugger;
                var BulletArray = [];
                BulletArray.push(InvoiceDetails);
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
                    status = BulletArray[key].status;
                } else {
                    var invoiceObject = JSON.parse(invoice)
                    status = BulletArray[key].status + invoiceObject[0].moStatus +1;
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
                $scope.anchorProgramId = {
                    anchorpoid: InvoiceDetails.anchorpoid,
                    AnchorName: InvoiceDetails.anchorname,
                    "programid": InvoiceDetails.anchorprogramID,
                    "InvId": $stateParams.InvId,
                    "anchorpoamount": InvoiceDetails.anchorpoamount,
                    "ChallanNumber": InvoiceDetails.ChallanNumber,
                    "InvDoc": InvoiceDetails.InvDoc,
                    "InvAmount": InvoiceDetails.InvAmount,
                    "PurchaseDoc": InvoiceDetails.anchorpoimage
                };

                var ImgDocParser = $scope.anchorProgramId.PurchaseDoc;


                var Imageconfig = {
                    method: 'POST',
                    url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/QueryImage',
           //         url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/QueryImage',
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
                            document.getElementById('myCanvasPoDOC').appendChild(canvas);
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
                            document.getElementById('myCanvasPoDOC1').appendChild(canvas);
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

        debugger;

        $scope.uploadPicBase = function (file) {

            Upload
                .base64DataUrl(file)
                .then(function (result) {

                    $scope.baseEncodedCode = result;

                    var BASE64_MARKER = ';base64,';

                    function convertDataURIToBinary(dataURI) {
                        debugger;
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

                    var pdfAsDataUri = result; // shortened
                    var pdfAsArray = convertDataURIToBinary(pdfAsDataUri);
                    var currPage = 1; //Pages are 1-based not 0-based
                    var numPages = 0;
                    var thePDF = null;
                    PDFJS.getDocument(pdfAsDataUri).then(function (pdf) {

                        //Set PDFJS global object (so we can easily access in our page functions
                        thePDF = pdf;

                        //How many pages it has
                        numPages = pdf.numPages;

                        //Start with first page
                        pdf.getPage(1).then(handlePages);
                        pdf.getPage(1).then(handlePages1);
                    });

                    function handlePages(page) {
                        //This gives us the page's dimensions at full scale
                        var viewport = page.getViewport(1);

                        //We'll create a canvas for each page to draw it on
                        var canvas = document.createElement("canvas");
                        canvas.style.display = "block";
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;


                        //Draw it on the canvas
                        page.render({canvasContext: context, viewport: viewport});

                        //Add it to the web page
                        document.getElementById('myCanvas').appendChild(canvas);


                        //Move to next page
                        currPage++;
                        if (thePDF !== null && currPage <= numPages) {
                            thePDF.getPage(currPage).then(handlePages);
                        }
                    }

                    function handlePages1(page) {

                        //This gives us the page's dimensions at full scale
                        var viewport = page.getViewport(1);

                        //We'll create a canvas for each page to draw it on
                        var canvas = document.createElement("canvas");
                        canvas.style.display = "block";
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;


                        //Draw it on the canvas
                        page.render({canvasContext: context, viewport: viewport});

                        //Add it to the web page
                        document.getElementById('myCanvas1').appendChild(canvas);


                        //Move to next page
                        currPage++;
                        if (thePDF !== null && currPage <= numPages) {
                            thePDF.getPage(currPage).then(handlePages1);
                        }
                    }


                });

        };
        $scope.modifyVendorSignInVoice = function (anchorProgramId) {

            debugger;
            var config = {
                method: 'POST',
                url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/VendorInv',
          //      url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/VendorInv',
                data: {
                    "programdetails": {
                        "create": {
                            "userid": "MRF",
                            "programid": anchorProgramId.programid,
                            "InvAmount": anchorProgramId.InvAmount,
                            "InvDoc": $scope.baseEncodedCode,
                            "InvId": anchorProgramId.InvId,
                            "ChallanNumber": anchorProgramId.ChallanNumber

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
                    alert('Vendor sign invoice Updated Successfully')
                    console.log(response);
                }, function (error) {
                    alert('Error: Vendor sign invoice Updation')
                });
        };

    }
})();

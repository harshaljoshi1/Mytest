(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .controller('ModifyAnchorSignPurchaseOrderController', ModifyAnchorSignPurchaseOrderController);

  /** @ngInject */
  function ModifyAnchorSignPurchaseOrderController($scope,Upload,apiCallService,$stateParams) {

 var purchaseConfig = {
          method: 'POST',
          url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/BlockChain/ProgramDetails/Query',
    //      url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/Query',
          data: {
            "programdetails": {
              "create":{
                "programid":$stateParams.programId,
                "userid":"YBL"
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
          .apiCallToServer(purchaseConfig)
          .then(function (response) {
            var ProgramDetails =response.result.message;
            ProgramDetails=JSON.parse(ProgramDetails);
              var BulletArray = [];
              BulletArray.push(ProgramDetails);
              $scope.bulletData = BulletArray;
              $scope.chart = [];
              $scope.chartOptions = [];

              angular.forEach(BulletArray, function (value, key) {
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

                  $scope["data" + key] = {
                    // title options

                    "title": BulletArray[key].anchorprogramID,
                    "ranges": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13 ,14,15],
                    "measures": [BulletArray[key].status],
                    "markers": [BulletArray[key].status]
                  }
                  $scope.chart[key] = $scope["data" + key];
                  $scope.chartOptions[key] = $scope["options" + key];

                  if (value.status == 0) {
                    EmptyAPIds.push(value.anchorprogramID)
                    $scope.options = EmptyAPIds;
                    $scope.isDisabled = true;

                  }
                }

              });
              console.log($scope.chart);


            $scope.anchorProgramId = {
              VendorFirstName:ProgramDetails.vendorfname,
              AnchorProgramId:ProgramDetails.anchorprogramID,
              anchorInterestPeriod:ProgramDetails.anchorgraceinterestperiod,
              anchorpoamount:ProgramDetails.anchorpoamount,
              anchorInterest:ProgramDetails.anchorinterest,
              anchorGraceInterest:ProgramDetails.anchorgraceinterest,
              anchorPenalInterest:ProgramDetails.anchorpenalinterest,
              POId:ProgramDetails.anchorpoid

            };
          }, function (error) {
            console.log(error);
          });
    $scope.uploadPicBase = function (file) {


      Upload
        .base64DataUrl(file)
        .then(function (result) {

          $scope.baseEncodedCode = result;

          var BASE64_MARKER = ';base64,';

          function convertDataURIToBinary(dataURI) {
            debugger;

          }
          var pdfAsDataUri = result; // shortened
          var base64Index = pdfAsDataUri.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
          var base64 = pdfAsDataUri.substring(base64Index);
          var raw = window.atob(base64);
          var rawLength = raw.length;
          var pdfAsArray = new Uint8Array(new ArrayBuffer(rawLength));

          for(var i = 0; i < rawLength; i++) {
            pdfAsArray[i] = raw.charCodeAt(i);
          }

          var currPage = 1; //Pages are 1-based not 0-based
          var numPages = 0;
          var thePDF = null;
          PDFJS.getDocument(pdfAsDataUri).then(function(pdf) {

            //Set PDFJS global object (so we can easily access in our page functions
            thePDF = pdf;

            //How many pages it has
            numPages = pdf.numPages;

            //Start with first page
            pdf.getPage( 1 ).then( handlePages );
            pdf.getPage( 1 ).then( handlePages1 );
          });

          function handlePages(page)
          {
            //This gives us the page's dimensions at full scale
            var viewport = page.getViewport( 1 );

            //We'll create a canvas for each page to draw it on
            var canvas = document.createElement( "canvas" );
            canvas.style.display = "block";
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;


            //Draw it on the canvas
            page.render({canvasContext: context, viewport: viewport});

            //Add it to the web page
            document.getElementById('myCanvas').appendChild( canvas );


            //Move to next page
            currPage++;
            if ( thePDF !== null && currPage <= numPages )
            {
              thePDF.getPage( currPage ).then( handlePages );
            }
          }
          function handlePages1(page)
          {

            //This gives us the page's dimensions at full scale
            var viewport = page.getViewport( 1 );

            //We'll create a canvas for each page to draw it on
            var canvas = document.createElement( "canvas" );
            canvas.style.display = "block";
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;


            //Draw it on the canvas
            page.render({canvasContext: context, viewport: viewport});

            //Add it to the web page
            document.getElementById('myCanvas1').appendChild( canvas );


            //Move to next page
            currPage++;
            if ( thePDF !== null && currPage <= numPages )
            {
              thePDF.getPage( currPage ).then( handlePages1 );
            }
          }


        /*  PDFJS.getDocument(pdfAsDataUri).then(function (pdf) {
            pdf.getPage(1).then(function (page) {
              var scale = 1;
              var viewport = page.getViewport(scale);
              var canvas = document.getElementById('myCanvas');
              var canvas1 = document.getElementById('myCanvas1');
              var context = canvas.getContext('2d');
              var context1 = canvas1.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              canvas1.height = viewport.height;
              canvas1.width = viewport.width;
              page.render({ canvasContext: context, viewport: viewport });
              page.render({ canvasContext: context1, viewport: viewport });
            });
          });*/

        });

    };

    $scope.modifyAnchorSignPo = function (anchorProgramId) {

      var config = {
        method: 'POST',
        url: 'https://uatsky.yesbank.in/app/uat/BlockChain/ProgramDetails/AnchorPO',
     //   url: 'https://10.0.45.87:1443/BlockChain2/ProgramDetails/AnchorPO',
        data: {
        "programdetails": {
        "create": {
          "userid": "YBL",
          "programid":anchorProgramId.AnchorProgramId ,
          "POAmount": anchorProgramId.anchorpoamount,
          "PODoc": $scope.baseEncodedCode,
          "POId": anchorProgramId.POId
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
          alert('Anchor sign purchase Updated Successfully')
          console.log(response);
        }, function (error) {
          console.log(error);
        });
    };

  }
})();

(function () {
  'use strict';

  angular
    .module('yesBankAngular.anchor')
    .controller('ModifyAnchorAgreementController', ModifyAnchorAgreementController);

  function ModifyAnchorAgreementController($scope, $uibModal, $state, $timeout, urls, apiCallService, Upload,$stateParams) {

     var anchorConfig = {
          method: 'POST',
          url: urls.apiUrl + 'getAnchorsDetail',
          data: {
            "getAnchorsDetail": {
              "AnchorRefNumber": $stateParams.refNo,
              "Enabled": $stateParams.enabled
            }},
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

            var details = response.getAnchorsDetailResponse.ListofAnchors;

           if(details){
             $scope.anchor = {
               ApplicationId:details[0].ApplicationId,
               AnchorCBSAccount:details[0].AnchorCBSAccount,
               PoolCustId:details[0].PoolCustId,
               CustomerMobileNo:details[0].CustomerMobileNo,
               CustomerEmail:details[0].CustomerEmail,
               AnchorAddress:details[0].AnchorAddress,
               AnchorRole:details[0].AnchorRole,
               CollectionMethod:details[0].CollectionMethod,
               CustomerId:details[0].CustomerId,
               Enabled:details[0].Enabled,
               IFSCCode:details[0].IFSCCode,
               LandMark:details[0].LandMark,
               LimitExpiryDate:details[0].LimitExpiryDate,
               CustomerName: details[0].CustomerName,
               AnchorRefNumber: details[0].AnchorRefNumber,
               AccruedInterestPayableGL: details[0].AccruedInterestPayableGL,
               AccruedInterestReceivableGL: details[0].AccruedInterestReceivableGL,
               CustomersLimit: details[0].CustomersLimit,
               FeeIncomeAccountNo: details[0].FeeIncomeAccountNo,
               FeePercentage: details[0].FeePercentage,
               GraceInterest: details[0].GraceInterest,
               GraceInterestPeriod: details[0].GraceInterestPeriod,
               Interest: details[0].Interest,
               InterestEarnedGL: details[0].InterestEarnedGL,
               Liquidation: details[0].Liquidation,
               MaximumOverDuePercentage: details[0].MaximumOverDuePercentage,
               OperationsEmail: details[0].OperationsEmail,
               PenalInterest: details[0].PenalInterest,
               PoolAccountNo: details[0].PoolAccountNo,
               RelationshipManagerEmail: details[0].RelationshipManagerEmail,
               RepaymentAccountNo: details[0].RepaymentAccountNo,
               VendorFinanceGL: details[0].VendorFinanceGL,
               Tenure:details[0].Tenure
             };
           }
            else{
             alert('AnchorRefId not found')
           }




          }, function (error) {
            console.log(error);
          });
    $scope.anchor = JSON.parse(localStorage.getItem('anchor'));
    console.log('$scope.anchor', $scope.anchor);

    $scope.CancelAnchor = function(){
      $state.go('app.anchor-agreement');
    };

    $scope.uploadPicBase = function (file) {

      Upload
        .base64DataUrl(file)
        .then(function (result) {

          $scope.baseEncodedCode = result;

          var BASE64_MARKER = ';base64,';

          function convertDataURIToBinary(dataURI) {
            var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            var base64 = dataURI.substring(base64Index);
            var raw = window.atob(base64);
            var rawLength = raw.length;
            var array = new Uint8Array(new ArrayBuffer(rawLength));

            for(var i = 0; i < rawLength; i++) {
              array[i] = raw.charCodeAt(i);
            }
            return array;
          }
          var pdfAsDataUri = result; // shortened
          var pdfAsArray = convertDataURIToBinary(pdfAsDataUri);
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

    $scope.modifyAnchor = function (anchor) {

      debugger;
      var config = {
        method: 'POST',
        url: urls.apiUrl + 'AnchorRegistration',
        data: {
        "AnchorRegistration": {
          "ApplicationId": null,
          "PoolCustId":anchor.PoolCustId,
          "AnchorCBSAccount":anchor.AnchorCBSAccount,
          "CustomerMobileNo": anchor.CustomerMobileNo,
          "CustomerName": anchor.CustomerName,
          "Enabled": "Y",
          "AccruedInterestPayableGL": anchor.AccruedInterestPayableGL,
          "AccruedInterestReceivableGL": anchor.AccruedInterestReceivableGL,
          "CustomerEmail": anchor.CustomerEmail,
          "CustomerId":anchor.CustomerId,
          //"CollectionMethod": null,
          "CustomersLimit": anchor.CustomersLimit,
          "FeeIncomeAccountNo": anchor.FeeIncomeAccountNo,
          "FeePercentage": anchor.FeePercentage,
          "GraceInterest": anchor.GraceInterest,
          "GraceInterestPeriod": anchor.GraceInterestPeriod,
          "Interest": anchor.Interest,
          "InterestEarnedGL": anchor.InterestEarnedGL,
          "LimitExpiryDate":anchor.LimitExpiryDate ,
          "Liquidation": anchor.Liquidation,
          "MaximumOverDuePercentage": anchor.MaximumOverDuePercentage,
          "OperationsEmail": anchor.OperationsEmail,
          "PenalInterest": anchor.PenalInterest,
          "PoolAccountNo": anchor.PoolAccountNo,
          "RelationshipManagerEmail": anchor.RelationshipManagerEmail,
          "RepaymentAccountNo": anchor.RepaymentAccountNo,
          "VendorFinanceGL": anchor.VendorFinanceGL,
          "AnchorRefNumber": anchor.AnchorRefNumber,
          "IFSCCode": anchor.IFSCCode,
          "AnchorAddress": anchor.AnchorAddress,
          "AnchorDoc":$scope.baseEncodedCode,
          "Tenure":anchor.Tenure,
          "AnchorDocumentPS":$scope.baseEncodedCode24,
          //"AnchorRole": null,
          "Landmark": anchor.Landmark

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
          alert('Anchor Updated Successfully')
          console.log(response);
        }, function (error) {
          console.log(error);
        });
    };

  }
})();

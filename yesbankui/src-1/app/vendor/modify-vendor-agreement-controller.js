(function () {
  'use strict';

  angular
    .module('yesBankAngular.vendor')
    .controller('ModifyVendorAgreementController', ModifyVendorAgreementController);

  function ModifyVendorAgreementController($scope, $state, urls, apiCallService, Upload, $stateParams) {

    console.log('$scope.vendor', $scope.vendor);
    $scope.CancelVendor = function () {
      $state.go('app.vendor-agreement');
    };
    var vendorConfig = {
      method: 'POST',
      url: urls.apiUrl + 'getVendorsDetail',
      data: {
        "getVendorsDetail": {
          "VendorRefNumber": $stateParams.refNo,
          "Enabled": $stateParams.enabled
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
      .apiCallToServer(vendorConfig)
      .then(function (response) {
        console.log("response is", response);
        var details = response.getVendorsDetailResponse.ListofVendors;

        if (details) {
          $scope.vendor = {
            AnchorRefNumber:details[0].AnchorRefNumber,
            VendorFirstName: details[0].VendorFirstName,
            VendorLastName: details[0].VendorLastName,
            VendorRefNumber: details[0].VendorRefNumber,
            SupplierCode: details[0].SupplierCode,
            CustomerId: details[0].CustomerId,
            CorporateCustomerId: details[0].CorporateCustomerId,
            SupplierODAccount: details[0].SupplierODAccount,
            SupplierCurrentAccount: details[0].SupplierCurrentAccount,
            SupplierAccount: details[0].SupplierAccount,
            LimitExpiryDate: details[0].LimitExpiryDate,
            ExistingCustomer: details[0].ExistingCustomer,
            SupplierLimit: details[0].SupplierLimit,
            Tenure: details[0].Tenure,
            DiscountedRate:details[0].DiscountedRate
          };
        }
        else {
          alert('VendorRefId not found')
        }

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





    $scope.modifyVendor = function (vendor) {
      debugger;
      var config = {
        method: 'POST',
        url: urls.apiUrl + 'VendorRegistration',
        data: {
          VendorRegistartion: {
            Enabled: 'Y',
            VendorFirstName: vendor.VendorFirstName,
            VendorLastName: vendor.VendorLastName,
            VendorRefNumber: vendor.VendorRefNumber,
            SupplierCode: vendor.SupplierCode,
            CustomerId: vendor.CustomerId,
            CorporateCustomerId: vendor.CorporateCustomerId,
            SupplierODAccount: vendor.SupplierODAccount,
            SupplierCurrentAccount: vendor.SupplierCurrentAccount,
            SupplierAccount: vendor.SupplierAccount,
            LimitExpiryDate: vendor.LimitExpiryDate,
            ExistingCustomer: vendor.ExistingCustomer,
            SupplierLimit: vendor.SupplierLimit,
            VendorDoc: $scope.baseEncodedCode,
            Tenure: vendor.Tenure,
            DiscountedInterest:vendor.DiscountedInterest,
            VendorDocumentPS:$scope.baseEncodedCode24
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
          alert('Vendor Modification successful');
        }, function (error) {
          alert('Vendor Modification not successful');
        });
    };

  }
})();

(function () {
    'use strict';

    angular
        .module('yesBankAngular.anchor')
        .controller('AnchorProgramIntiationController', AnchorProgramIntiationController);

    /** @ngInject */
    function AnchorProgramIntiationController($scope, $uibModal, AnchorDetailsService, VendorDetailsService, AnchorProgramService) {
        var EmptyAPIds = [];
        AnchorProgramService.getAnchorProgramDetails().then(function (result) {
            var responseString = result.data.result.message;
            responseString = responseString.replace(/'/g, '"');
            responseString = JSON.parse(responseString);
            $scope.loading=false;
            $scope.loopThroughAnchorProgramIds = responseString;
            $scope.bulletData = responseString;
            $scope.chart = [];
            $scope.chartOptions = [];
            angular.forEach(responseString, function (value, key) {
                    if (value.status == 0) {
                        $scope['options' + key] = {
                        chart: {
                            type: 'bulletChart',
                            duration: 500
                        },
                        title: {
                            enable: true,
                            text: responseString[key].anchorname
                        },
                        subtitle: {
                            enable: true,
                            text: responseString[key].vendorfname,
                            css: {
                                'text-align': 'center',
                                'margin': '10px 13px 0px 7px'
                            }
                        }
                    };
                    $scope["data" + key] = {
                        // title options
                        "title": responseString[key].anchorprogramID,
                        "ranges": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13,14,15],
                        "measures": [responseString[key].status],
                        "markers": [responseString[key].status]
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

            console.log("response is", responseString);

        }, function (result) {
            alert("Error: get Anchor Program Details");
        });

        $scope.openPopup = function () {
            document.getElementById('spinner').style.display = 'none';
        };
        $scope.anchorProgramId = "";
        $scope.selectAnchor = {optradio: ''};
        $scope.selectVendor = {optradio: ''};
        $scope.isDisabled = false;

        $scope.createAnchorProgram = function () {

            document.getElementById("spinner").className = "spinner";
            document.getElementById("text1").innerHTML = "Generating Anchor Program Id";


            var text1 = "", text2 = "", firstTwoDigits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", remainingDigits = "0123456789";
            for (var i = 0; i < 2; i++) {
                text1 += firstTwoDigits.charAt(Math.floor(Math.random() * firstTwoDigits.length));
            }
            for (var j = 0; j < 7; j++) {
                text2 += remainingDigits.charAt(Math.floor(Math.random() * remainingDigits.length));
            }
            $scope.anchorProgramId = text1 + text2;
            document.getElementById("text2").innerHTML = "Checking Anchor Program Id for Uniqueness " + $scope.anchorProgramId;

            /* alert(" Checking Anchor Program Id for Uniqueness " + $scope.anchorProgramId);*/

            AnchorProgramService.createAnchorProgramId($scope.anchorProgramId).then(function (result) {
                document.getElementById("text3").innerHTML = "Creating Yes Bank Anchor Id Program with Anchor Id " + $scope.anchorProgramId;

                /*alert('Creating Yes Bank Anchor Id Program with Anchor Id ' + $scope.anchorProgramId);*/

                document.getElementById("text4").innerHTML = "Waiting for consensus from participant Peer";
                /*alert("Waiting for consensus from participant Peer ");*/

                AnchorProgramService.getNetworkPeers().then(function (result) {

                    var peers = result.data.peers;
                    var result = "";
                    if (peers.length) {
                        for (var i = 0; i < peers.length; i++) {
                            var peersValues = peers[i].ID.name;
                            result = result + '+' + peersValues;
                        }
                        var myString = result.substring(1);
                        /*alert('Achieving consensus ' + myString)*/
                        document.getElementById("text5").innerHTML = 'Achieving consensus ' + myString;

                    }


                }, function (result) {
                    alert("Error: network peers API is not reachable");
                });


            }, function (result) {
                alert("Error: create AnchorProgramId failed");
            });


            $scope.isDisabled = true;
        };


        $scope.updateAnchorProgram = function (anchorProgramId) {
            console.log($scope.selectAnchor.optradio);
            console.log($scope.selectVendor.optradio);
            console.log($scope.anchorProgramId);

            AnchorProgramService.updateAnchorProgramId($scope.selectAnchor.optradio, $scope.selectVendor.optradio, $scope.anchorProgramId).then(function (result) {

                alert("Anchor Program Updated Successfully");

            }, function (result) {
                alert("Error: updateAnchorProgramId failed");
            });

           $scope.DisabledOption =true;
        };

        $scope.getAnchorDetails = function () {

            AnchorDetailsService.getAnchorDetailsDataWithYes().then(function (result) {
                var length = result.data.getAnchorsDetailResponse.ListofAnchors.length;
                var AnchorArray = [];
                for (var i = 0; i < length; i++) {
                    if (result.data.getAnchorsDetailResponse.ListofAnchors[i].Enabled == "Y") {

                        AnchorArray.push(result.data.getAnchorsDetailResponse.ListofAnchors[i]);
                        $scope.loopThroughAnchors = AnchorArray;
                    }
                }
                console.log(AnchorArray.length);
                $scope.noOfAnchorProgramDetails = AnchorArray.length

            }, function (result) {
                alert("Error: anchor Details not recieved");
            });
        };
        $scope.getVendorDetails = function (AnchorRefNumber) {

            VendorDetailsService.getVendorDetailsDataWithRef(AnchorRefNumber).then(function (result) {

                if (result.data.getVendorsDetailResponse.ListofVendors) {
                    var length = result.data.getVendorsDetailResponse.ListofVendors.length;
                    var VendorArray = [];
                    for (var i = 0; i < length; i++) {
                        if (result.data.getVendorsDetailResponse.ListofVendors[i].Enabled == "Y") {

                            VendorArray.push(result.data.getVendorsDetailResponse.ListofVendors[i]);
                            $scope.loopThroughVendors = VendorArray;
                        }

                    }
                }
                else {
                    alert('No matched Vendor Details');
                    $scope.loopThroughVendors = [];
                }


            }, function (result) {
                alert("Error: Vendor details not recived");
            });
        };


        $scope.getAnchorDetails();


    }
})();

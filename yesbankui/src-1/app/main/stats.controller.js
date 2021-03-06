(function() {
    'use strict';
    angular
        .module('yesBankAngular')
        .controller('StatsController', StatsController);
    /** @ngInject */
    function StatsController($scope, $timeout, StatsService, AnchorProgramService) {
        var EmptyAPIds = [];
        AnchorProgramService.getAnchorProgramDetails().then(function(result) {
            var responseString = result.data.result.message;
            responseString = responseString.replace(/'/g, '"');
            responseString = JSON.parse(responseString);
            $scope.bulletData = responseString;
            $scope.chart = [];
            $scope.chartOptions = [];
            angular.forEach(responseString, function(value, key) {
                $scope['options' + key] = {
                    chart: {
                        type: 'bulletChart',
                        duration: 500,
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
                var invoice = JSON.stringify(responseString[key].invoices);
                if (invoice === "null" || invoice === null || typeof invoice === "undefined") {
                    status = responseString[key].status;
                } else {
                    var invoiceObject = JSON.parse(invoice)
                    status = responseString[key].status + invoiceObject[0].moStatus +1;
                };
                $scope["data" + key] = {
                    // title options
                    "title": responseString[key].anchorprogramID,
                    "ranges": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15],
                    "measures": [status],
                    "markers": [status]
                }
                $scope.chart[key] = $scope["data" + key];
                $scope.chartOptions[key] = $scope["options" + key];
                if (value.status == 0) {
                    EmptyAPIds.push(value.anchorprogramID)
                    $scope.options = EmptyAPIds;
                    $scope.isDisabled = true;
                }
            });
            console.log($scope.chart);
            console.log("response is", responseString);
        }, function(result) {
            alert("Error: get Anchor Program Details");
        });
        $scope.$on('showLastBlockCreationDate', function(event, data) {
        //    $scope.lastblockCreati        onDate = $filter('data')(date[ data, "dd/MM/yyyy"]);
              $scope.lastblockCreationDate =  data;
              var date1 = $filter('date')(new Date(data), 'dd/MM/yyyy'); 
               //     data = $filter('data')(date[ data, "dd/MM/yyyy"]);
        altert("Date "+ date1)
        });
        $scope.$on('showTransactionsInLastBlock', function(event, data) {
            $scope.transactionsInLastBlock = data;
        });
        $scope.$on('showAvgBlockTime', function(event, data) {
      //      $scope.blockNumber = result.data.height - 1;
           //      alert("block result "+ event);
      


           $scope.avgBlockTime = data;
        });
        StatsService.getCurrentBlockValue().then(function(result) {
            $scope.blockNumber = result.data.height - 1;
            $scope.blockHeight = result.data.height;
            if ($scope.blockHeight <
                10) {
                for (var i = 1; i <
                    $scope.blockHeight; i++) {
                    StatsService.getTransactions(i).then(function(result) {}, function(result) {});
                
                }
            }
            if ($scope.blockHeight > 10) {
                var lastTen = $scope.blockHeight - 10;
                for (var i = $scope.blockHeight - 1; i > lastTen; i--) {
                    StatsService.getTransactions(i).then(function(result) {}, function(result) {});
                }
            }
        }, function(result) {});
        $scope.blockTime = 1833456;
        $scope.avgTime = 966155;
        $scope.counter = 12345550;
        $scope.onTimeout = function() {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
        };
        var mytimeout = $timeout($scope.onTimeout, 1000);
    }
})();
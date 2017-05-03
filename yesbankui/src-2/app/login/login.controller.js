(function () {
    'use strict';

    angular
        .module('yesBankAngular.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, $timeout, $state, localStorageService, urls, apiCallService, $rootScope, LoginService) {

        LoginService.ClearCredentials();
        $scope.successfulLogin = true;

        $scope.signUser = function (data) {

            LoginService.Login(data).then(function (result) {

                LoginService.SetCredentials(data.username, data.password, data.role);
                if (data.role == "ANCHOR") {
                    $state.go('app.anchor-sign-purchase-order');
                }
                if (data.role == "VENDOR") {
                    $state.go('app.vendor-sign-invoice');
                }
                if (data.role == "PAYMENT") {
                    $state.go('app.payment-initiation');
                }
                if (data.role == "BANK") {
                    $state.go('app.stats');
                }
                 if (data.role == "SETTLEMENT") {
                    $state.go('app.settlement');
                }

            }, function (result) {
                $scope.successfulLogin = false;
                $timeout(function() {
                  $scope.successfulLogin = true;
                }, 3000);
            });
        };

        $scope.closeErrorDiv = function(){
          $scope.successfulLogin = true;
        }
    }
})();

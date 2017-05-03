(function () {
    'use strict';

    angular
        .module('yesBankAngular')
        .controller('NavController', NavController);

    /** @ngInject */
    function NavController($scope, toastr, localStorageService, $state) {
        var vm = this;

        var getObj = localStorageService.get('userObj');

        if (!getObj) {
            $state.go('login');
        }
        else{
            $scope.role = getObj.role;
        }

        $scope.logout = function () {
            $state.go('login');
        }


    }
})();

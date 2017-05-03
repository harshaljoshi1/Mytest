(function () {
    'use strict';

    angular
        .module('yesBankAngular.login')
        .factory('LoginService',
        ['Base64', '$http', '$rootScope','localStorageService',
            function (Base64, $http, $rootScope, localStorageService) {
                var service = {};
                service.successfulLogin = true;

                service.Login = function (data, callback) {
                    var authdata = Base64.encode(data.username + ':' + data.password);
                    var base64Conv = 'Basic ' + authdata;

                    var data = $http({
                        method: 'GET',
                        url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/LoginService?role=' + data.role,
//                        url: 'https://10.0.45.87:1443/BlockChain2/LoginService?role=' + data.role,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-IBM-Client-Id': '174524e5-cec9-4305-a147-2eb41a900dda',
                            'Authorization': base64Conv
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true
                    });
                    return data;


                };

                service.SetCredentials = function (username, password, role) {

                    var authdata = Base64.encode(username + ':' + password);
                    $rootScope.globals = {
                        currentUser: {
                            username: username,
                            password:password,
                            role:role,
                            authdata: authdata
                        }
                    };
                    localStorageService.set('userObj',$rootScope.globals.currentUser);

                };

                service.ClearCredentials = function () {

                    localStorageService.clearAll();

                };

                return service;
            }])
})();

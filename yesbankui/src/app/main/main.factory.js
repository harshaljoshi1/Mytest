(function () {
  'use strict';

  angular
    .module('yesBankAngular')
    .factory('apiCallService', apiCallService);

  function apiCallService($http, $q, $log) {
    var instance = {};
    var config = null;

    instance.apiCallToServer = function (config) {

      var deferred = $q.defer();

      $http(config)
        .success(function (data, status, header, config) {
          deferred.resolve(data);
        })
        .error(function (data, status, header, config) {
          deferred.reject(status);
        });
      return deferred.promise;
    };
    return instance;
  }

})();

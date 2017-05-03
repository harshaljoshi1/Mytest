(function () {
  'use strict';

  angular
    .module('yesBankAngular')
    .service('StatsService', StatsService);

  function StatsService($http, urls, $rootScope) {
    var factory = {
      getCurrentBlockValue: function () {
        var data = $http({
          method: 'GET', url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/chain', data: {
      //    method: 'GET', url: 'https://10.0.45.87:1443/BlockChain2/Gateway/chain', data: {
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getCreatedTime: function () {
        var data = $http({
          method: 'GET', url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/chain/blocks/', data: {
      //    method: 'GET', url: 'https://10.0.45.87:1443/BlockChain2/Gateway/chain/blocks/', data: {
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },
      getTransactions: function (blockId) {
        var data = $http({
          method: 'GET', url: 'https://uatsky.yesbank.in/app/uat/BlockChainGateway/chain/blocks/' +blockId, data: {
     //     method: 'GET', url: 'https://10.0.45.87:1443/BlockChain2/Gateway/chain/blocks/' +blockId, data: {
          },
          headers:{
            'Content-Type': 'application/json',
            'X-IBM-Client-Id':'174524e5-cec9-4305-a147-2eb41a900dda'
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        });
        return data;
      },

    };
    return factory;
  }
})();

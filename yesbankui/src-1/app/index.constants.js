/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('yesBankAngular')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('urls', {
      apiUrl: 'https://uatsky.yesbank.in/app/uat/BlockChainRegistration/',
 //    apiUrl: 'https://10.0.45.87:1443/BlockChain/Registration/',
      /*apiUrl: 'http://127.0.0.1:8080/',*/
      //apiUrl: 'http://172.168.1.17:8080/',
      //apiUrl: 'http://172.168.1.233:8080/',
      //apiUrl: 'http://172.168.1.31:8080/',

    });

})();

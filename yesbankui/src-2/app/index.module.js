(function () {
  'use strict';


  angular
    .module('yesBankAngular', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ui.router',
      'ui.bootstrap',
      'pdf',
      'ngFileUpload',
      'toastr',
      'LocalStorageModule',
      'yesBankAngular.login',
      'yesBankAngular.vendor',
      'yesBankAngular.anchor',
      'yesBankAngular.payment',
      "chart.js",
      'nvd3',
      'angularSpinners'
    ]);
})();

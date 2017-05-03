(function () {
  'use strict';

  angular
      .module('yesBankAngular.anchor')
      .controller('AnchorRegistrationController', AnchorRegistrationController);

  /** @ngInject */
  function AnchorRegistrationController($scope, AnchorRegistrationService) {

    $scope.registerAnchor = function (anchor) {
      $scope.submitted = true;
      console.log($scope.myForm.$valid);
      if($scope.myForm.$valid)
      {
        console.log("entered");
        AnchorRegistrationService.submitAnchorRegistration(anchor).then(function (result) {

          alert('Registration Successful');
        }, function (result) {
          alert("Error: anchor registration is not successful");
        });
      }

    };
  }
})();

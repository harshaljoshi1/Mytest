(function () {
    'use strict';

    angular
        .module('yesBankAngular')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $state, $http, localStorageService) {


        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            var userobj = localStorageService.get('userObj');
            if (userobj) {
                if (toState.name == 'app.anchro-sign-prchase-oder' || toState.name == 'app.anchor-registration' || toState.name == 'app.anchor-sign-purchase-order' || toState.name == 'app.modify-anchor-sign-purchase-order' || toState.name == 'app.anchor-invoice-acceptance' || toState.name == 'app.modify-anchor-invoice-acceptance' || toState.name == 'app.anchor-payment-status'|| toState.name == 'app.anchor-pending-payment') {
                    debugger;
                    if (userobj.role !== 'ANCHOR') {
                        event.preventDefault();
                        $state.go('login');
                    }
                    else {
                        $state.go(toState.name);
                    }
                }
                else if (toState.name == 'app.vendor-registration' || toState.name == 'app.vendor-sign-invoice' || toState.name == 'app.modify-vendor-sign-invoice' || toState.name == 'app.vendor-payment-status') {
                    debugger;
                    if (userobj.role !== 'VENDOR') {
                        event.preventDefault();
                        $state.go('login');
                    } else {
                        $state.go(toState.name);
                    }
                }
                else if (toState.name == 'app.stats' || toState.name == 'app.anchor-agreement' || toState.name == 'app.modify-anchor-agreement' || toState.name == 'app.vendor-agreement' || toState.name == 'app.modify-vendor-agreement' || toState.name == 'app.anchor-program-initiation' || toState.name == 'app.anchor-program-pending'|| toState.name == 'app.anchor-order-closed') {
                    if (userobj.role !== 'BANK') {
                        event.preventDefault();
                        $state.go('login');
                    } else {
                        $state.go(toState.name);
                    }
                }

                else if (toState.name == 'app.payment-initiation') {
                    if (userobj.role !== 'PAYMENT') {
                        event.preventDefault();
                        $state.go('login');
                    }
                    else {
                        $state.go(toState.name);
                    }
                }
                else if (toState.name == 'app.settlement' || toState.name == 'app.anchor-order-closed' || toState.name == 'app.vendor-payment' ) {
                    if (userobj.role !== 'SETTLEMENT') {
                        event.preventDefault();
                        $state.go('login');
                    }
                    else {
                        $state.go(toState.name);
                    }
                }
                else if (toState.name == 'app') {
                    if (userobj.role) {
                        $state.go(toState.name);

                    }
                    else {
                        event.preventDefault();
                        $state.go('login');
                    }
                }

            }

            console.log(toState.name, localStorageService.get('userObj'));


        });

        $log.debug('runBlock end');
    }

})();

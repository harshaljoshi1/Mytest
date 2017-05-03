(function () {
  'use strict';

  angular
    .module('yesBankAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'app/main/nav.html',
        abstract: true,
        controller: 'NavController'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController'
      })
      .state('app.stats', {
        url: '/stats',
        views: {
          'main-view': {
            templateUrl: 'app/main/stats.html',
            controller:'StatsController'
          }
        }
      })
      .state('app.anchor-registration', {
        url: '/anchor-registration',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-registration.html',
            controller: 'AnchorRegistrationController'
          }
        }
      })
      .state('app.anchor-agreement', {
        url: '/anchor-agreement',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-agreement.html',
            controller:'AnchorAgreementController'
          }
        }
      })
      .state('app.modify-anchor-agreement', {
        url: '/modify-anchor-agreement/:refNo/:enabled',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/modify-anchor-agreement.html',
            controller:'ModifyAnchorAgreementController'

          }
        }
      })
      .state('app.vendor-registration', {
        url: '/vendor-registration',
        views: {
          'main-view': {
            templateUrl: 'app/vendor/vendor-registration.html',
            controller: 'VendorRegistrationController'
          }
        }
      })
      .state('app.vendor-agreement', {
        url: '/vendor-agreement',
        views: {
          'main-view': {
            templateUrl: 'app/vendor/vendor-agreement.html',
            controller:'VendorAgreementController'
          }
        }
      })
      .state('app.modify-vendor-agreement', {
        url: '/modify-vendor-agreement/:refNo/:enabled',
        views: {
          'main-view': {
            templateUrl: 'app/vendor/modify-vendor-agreement.html',
            controller:'ModifyVendorAgreementController'
          }
        }
      })
      .state('app.anchor-program-pending', {
        url: '/anchor-program-pending',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-program-pending.html',
           controller:'AnchorProgramPendingController'
          }
        }
      })
      .state('app.anchor-order-closed', {
        url: '/anchor-order-closed',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-order-closed.html',
            controller:"AnchorOrderClosedController"
          }
        }
      })
      .state('app.anchor-program-initiation', {
        url: '/anchor-program-initiation',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-program-initiation.html',
            controller:'AnchorProgramIntiationController'
          }
        }
      })
      .state('app.anchor-sign-purchase-order', {
        url: '/anchor-sign-purchase-order',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-sign-purchase-order.html',
            controller:'AnchorSignPurchaseOrderController'
          }
        }
      })
      .state('app.modify-anchor-sign-purchase-order', {
        url: '/modify-anchor-sign-purchase-order/:programId',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/modify-anchor-sign-purchase-order.html',
            controller:'ModifyAnchorSignPurchaseOrderController'
          }
        }
      })
      .state('app.anchor-invoice-acceptance', {
        url: '/anchor-invoice-acceptance',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-invoice-acceptance.html',
            controller:'AnchorInvoiceAcceptanceController'
          }
        }
      })
      .state('app.modify-anchor-invoice-acceptance', {
        url: '/modify-anchor-invoice-acceptance/:poIDr/:moID',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/modify-anchor-invoice-acceptance.html',
            controller:'ModifyAnchorInvoiceAcceptanceController'
          }
        }
      })
      .state('app.anchor-pending-payment', {
        url: '/anchor-pending-payment',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-pending-payment.html',
            controller:"AnchorPendingPaymentController"
          }
        }
      })
      .state('app.anchor-payment-status', {
        url: '/anchor-payment-status',
        views: {
          'main-view': {
            templateUrl: 'app/anchor/anchor-payment-status.html',
            controller:"AnchorPaymentStatusController"
          }
        }
      })
      .state('app.vendor-sign-invoice', {
        url: '/vendor-sign-invoice',
        views: {
          'main-view': {
            templateUrl: 'app/vendor/vendor-sign-invoice.html',
            controller:"VendorSignInvoiceController"
          }
        }
      })
      .state('app.modify-vendor-sign-invoice', {
        url: '/modify-vendor-sign-invoice/:programId/:InvId',
        views: {
          'main-view': {
            templateUrl: 'app/vendor/modify-vendor-sign-invoice.html',
            controller:"ModifyVendorSignInvoiceController"

          }
        }
      })
        .state('app.vendor-payment', {
          url: '/vendor-payment',
          views: {
            'main-view': {
              templateUrl: 'app/vendor/vendor-payment.html',
              controller:"VendorPaymentController"

            }
          }
        })
      .state('app.vendor-payment-status', {
        url: '/vendor-payment-status',
        views: {
          'main-view': {
            templateUrl: 'app/vendor/vendor-payment-status.html',
            controller:"VendorPaymentStatusController"
          }
        }
      })
      .state('app.payment-initiation', {
        url: '/payment-initiation',
        views: {
          'main-view': {
            templateUrl: 'app/payment/payment-initiation.html',
            controller: 'PaymentInitiationController'
          }
        }
      })
      .state('app.settlement', {
        url: '/settlement',
        views: {
          'main-view': {
            templateUrl: 'app/main/settlement.html',
            controller:"SettlementController"
          }
        }
      });

    $urlRouterProvider.otherwise('/login');
  }

})();

angular.module('myApp.landing', ['ngResource', 'ui.router','ngMaterial','ngAnimate', 'ui.bootstrap'])

    .config(function ($stateProvider, $urlRouterProvider, landingState) {
        $stateProvider

            .state('landing', {

                abstract: true,
                parent: 'root',

                url: '/landing',


            })

            .state(landingState.name, landingState.options);

    });


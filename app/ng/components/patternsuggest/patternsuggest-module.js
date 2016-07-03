angular.module('myApp.patternsuggest', ['ngResource', 'ui.router','ngMaterial','ngAnimate', 'ui.bootstrap'])

    .config(function ($stateProvider, $urlRouterProvider, suggestState) {
        $stateProvider

            .state('patternsuggest', {

                abstract: true,
                parent: 'root',

                url: '/patternsuggest',

            })

            .state(suggestState.name, suggestState.options);

    });


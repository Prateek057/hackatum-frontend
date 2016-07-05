angular.module('myApp.stats', ['ngResource', 'ui.router'])

    .config(function ($stateProvider, $urlRouterProvider, statsState) {
        $stateProvider

            .state('stats', {

                abstract: true,
                parent: 'root',

                url: '/stats',
            })
            .state(statsState.name, statsState.options);

    });


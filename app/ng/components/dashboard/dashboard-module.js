angular.module('myApp.dashboard', ['ngResource', 'ui.router',
    'ngMaterial','ngResource','angularUtils.directives.dirPagination', 'ngMessages'])

    .config(function ($stateProvider, $urlRouterProvider, dashboardState) {
        $stateProvider

            .state('dashboard', {

                abstract: true,
                parent: 'root',

                url: '/dashboard',


            })

            .state(dashboardState.name, dashboardState.options);

    });






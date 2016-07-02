/**
 * Created by Akash on 6/17/2016.
 */
angular.module('myApp.antipattern',
    ['ngResource', 'ui.router','ngMaterial','ngResource','angularUtils.directives.dirPagination'])

    .config(function ($stateProvider, $urlRouterProvider, antipatternState) {
        $stateProvider

            .state('antipattern', {

                abstract: true,
                parent: 'root',

                url: '/antipattern',

            })

            .state(antipatternState.name, antipatternState.options);

    });
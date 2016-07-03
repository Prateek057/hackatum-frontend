angular.module('myApp.result', ['ngResource', 'ui.router', 'ngAnimate'])
.config(function ($stateProvider,   $urlRouterProvider, resultState) {
    $stateProvider
        .state('result', {

            abstract: true,
            parent: 'root',
            url: '/result'

        })
        .state(resultState.name, resultState.options)
});
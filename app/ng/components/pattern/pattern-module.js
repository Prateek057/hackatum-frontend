angular.module('myApp.pattern', ['ngResource', 'ui.router', 'ngAnimate'])
.config(function ($stateProvider,   $urlRouterProvider, patternState) {
    $stateProvider
        .state('pattern', {

            abstract: true,
            parent: 'root',

            url: '/pattern'

        })
        .state(patternState.name, patternState.options, patternState.Phases)
});
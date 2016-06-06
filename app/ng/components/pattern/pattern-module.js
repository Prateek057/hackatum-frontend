/**
 * Created by prate_000 on 02-06-2016.
 */
angular.module('myApp.pattern', ['ngResource', 'ui.router', 'ngAnimate'])
.config(function ($stateProvider,   $urlRouterProvider, patternState) {
    $stateProvider
        .state('pattern', {

            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of its children.
            abstract: true,
            parent: 'root',

            // This abstract state will prepend '/movies' onto the urls of all its children.
            url: '/pattern'

        })
        .state(patternState.name, patternState.options)
});
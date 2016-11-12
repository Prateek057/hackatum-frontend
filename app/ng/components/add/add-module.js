angular.module('myApp.add', ['ngResource', 'ui.router'])

.config(function ($stateProvider,  $urlRouterProvider, add) {
    $stateProvider

        .state('add', {

            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of its children.
            abstract: true,
            parent: 'root',

            // This abstract state will prepend '/movies' onto the urls of all its children.
            url: '/add',


        })


        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'list' within the parent 'movies' state.
        .state(add.name, add.options)

});






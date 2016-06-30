/**
 * Created by Akash on 6/30/2016.
 */
angular.module('myApp.learningcenter', ['ngResource', 'ui.router',
        'ngMaterial','ngResource', 'ngMessages'])

    .config(function ($stateProvider, $urlRouterProvider, learningcenterState) {
        $stateProvider

            .state('learningcenter', {

                // With abstract set to true, that means this state can not be explicitly activated.
                // It can only be implicitly activated by activating one of its children.
                abstract: true,
                parent: 'root',

                // This abstract state will prepend '/movies' onto the urls of all its children.
                url: '/learningcenter',

                // since we have views we do not need to define a template here
                //template: '<div ui-view></div>',
            })

            // Using a '.' within a state name declares a child within a parent.
            // So you have a new state 'list' within the parent 'movies' state.
            .state(learningcenterState.name, learningcenterState.options);

    });

/**
 * Created by Gopala on 30-Jun-16.
 */

angular.module('myApp.feedview', ['ngResource', 'ui.router'])

    .config(function ($stateProvider, $urlRouterProvider, feedbackVState) {
        $stateProvider

            .state('feedview', {

                // With abstract set to true, that means this state can not be explicitly activated.
                // It can only be implicitly activated by activating one of its children.
                abstract: true,
                parent: 'root',

                // This abstract state will prepend '/movies' onto the urls of all its children.
                url: '/feedview',

                // since we have views we do not need to define a template here
                //template: '<div ui-view></div>',
            })

            // Using a '.' within a state name declares a child within a parent.
            // So you have a new state 'list' within the parent 'movies' state.
            .state(feedbackVState.name, feedbackVState.options);

        //.state(movieDetailsState.name, movieDetailsState.options);

    });

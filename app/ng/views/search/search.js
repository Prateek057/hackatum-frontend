'use strict';

angular.module('myApp.search')

    .constant('search', {
        name: 'search.list',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/movies' (because '/movies' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/search/search.html',
                    controller: 'SearchListCtrl',
                },
                // 'outside@root': {
                //     templateUrl: 'views/list/movie-list-buttons.html',
                //     controller: 'movieListButtonCtrl'
                // }
            },

            ncyBreadcrumb: {
                label: "maaKiAakh Search"
            }

        }

    })

    .controller('SearchListCtrl', function() {
        console.log("i am here again");

    })

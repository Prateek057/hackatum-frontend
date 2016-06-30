/**
 * Created by Akash on 5/31/2016.
 */
'use strict';

angular.module('myApp.result')

    .constant('resultState', {
        name: 'result.detail',
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
                    templateUrl: 'views/result/result.html',
                    controller: 'ResultCtrl'
                }
            },

            ncyBreadcrumb: {
                label: "The Results"
            }

        }
    })
    .controller('ResultCtrl', function($scope, Pattern) {

        var patternPromise =  Pattern.query(function(){
            console.log(patternPromise);
            var patternDetails = [];
            for(var ctr=0;ctr<patternPromise.length;ctr++){
                patternDetails.push(patternPromise[ctr]);
            }
            $scope.patterns = patternDetails;
            $scope.currentPattern = $scope.patterns[0];
        });

    })
    ;


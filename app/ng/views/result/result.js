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
    .controller('ResultCtrl', function($rootScope, $scope, PatternByName) {
        $scope.patternresults = [];
        $scope.result = null;
        $scope.showResultDiv = true;
        $scope.resultType = "pattern";

        if ($rootScope.patternResults === undefined){
            $scope.sadmessagetrue = true;
            $scope.sadMessage = "Sorry, looks like your requirement does not match any pattern, May be recheck your requirement for: Ambiguity ? Here are Some Sample Patterns" ;
            $scope.learningcentermsg = "Go to the Learning Center for More";
            $scope.patternTempresults = ["Adapter", "Composite"];
            console.log($scope.patternresults);
            $scope.patternTempresults.forEach(function(patternresult){
                getPatternDetails(patternresult);
            });
            $scope.currentNavItem = $scope.patternresults[0];
        }
        else{
            $rootScope.patternResults.forEach(function(patternresult){
                getPatternDetails(patternresult);
            });
        }

        function getPatternDetails(patternName){
            var patternPromise =  PatternByName.query(patternName).$promise;
            patternPromise.then(function(data){
                $scope.patternresults.push(data);
            });
        }
    })
    ;


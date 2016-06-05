/**
 * Created by Akash on 6/5/2016.
 */
'use strict';

angular.module('myApp.dashboard')
    .controller('SuggestedPatternCtrl',function($scope) {

    })
    .directive('mvSuggestedPattern', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/suggested-pattern/suggested-pattern.html',
            controller:'SuggestedPatternCtrl'
        };
    });
'use strict';

angular.module('myApp.dashboard')

    .directive('mvSuggestNewPattern', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/suggest-newpattern/suggest-newpattern.html'
        };
    })
;
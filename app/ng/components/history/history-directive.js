'use strict';

angular.module('myApp.dashboard')
    .directive('mvHistory', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/history/history.html'
        };
    });
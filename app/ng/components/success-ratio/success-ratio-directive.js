'use strict';

angular.module('myApp.dashboard')
    .directive('mvSuccessRatio', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/success-ratio/success-ratio.html'
        };
    });
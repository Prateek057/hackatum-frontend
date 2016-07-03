'use strict';

angular.module('myApp.result')

    .directive('mvResultCard', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/result-card/result-card.html'
        };
    })
;

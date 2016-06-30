'use strict';

angular.module('myApp.result')

    .directive('mvResultCard', function() {
        return {
            restrict: 'E',
            /*scope: {
                helpers: '=UtilityNamespace.helpers'
            },*/
            templateUrl: 'components/result-card/result-card.html'
        };
    })
;

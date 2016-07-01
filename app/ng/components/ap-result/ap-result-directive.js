'use strict';

angular.module('myApp.antipattern')

    .directive('mvApResult', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/ap-result/ap-result.html'
        };
    })
;
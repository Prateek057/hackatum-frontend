'use strict';

angular.module('myApp.patternsuggest')

    .directive('suggView', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/suggestedcomp/suggestedcomp.html'
        };
    });
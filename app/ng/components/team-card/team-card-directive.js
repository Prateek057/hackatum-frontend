'use strict';

angular.module('myApp.dashboard')

    .directive('teamCard', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/team-card/team-card.html'
        };
    });
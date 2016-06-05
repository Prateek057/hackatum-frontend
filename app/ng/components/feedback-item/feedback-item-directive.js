'use strict';

angular.module('myApp.dashboard')

    .directive('feedbackItem', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/feedback-item/feedback-item.html'
        };
    });
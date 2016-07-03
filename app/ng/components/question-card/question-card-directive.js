'use strict';

angular.module('myApp.pattern')

    .directive('mvQuestionCard', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/question-card/question-card.html'
        };
    });

/**
 * Created by prate_000 on 23-06-2016.
 */
'use strict';

angular.module('myApp.pattern')

    .directive('mvQuestionCard', function() {
        return {
            restrict: 'E',
            /*scope: {
                currentQuestion: '=currentQuestion'
             },*/
            templateUrl: 'components/question-card/question-card.html'
        };
    });

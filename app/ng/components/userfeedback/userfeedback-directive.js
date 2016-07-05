/**
 * Created by Gopala on 03-Jul-16.
 */

'use strict';

angular.module('myApp.feedview')
    .controller('CurrCntrl', function($scope,$location,$http,BASEURL,$mdDialog,$rootScope) {
        $scope.selhistory = $rootScope.selhistory;
        $scope.starPath = '../data/img/star.png';
        console.log($scope.selhistory);

        $scope.range = function(n) {
            return new Array(n);
        };
    })

    .directive('mvUserFeed', function() {
        return {
            restrict: 'E',
            //scope: {
            //    selhistory: '='
            //},
            templateUrl: 'components/userfeedback/userfeedback.html'
        };
    })
;

'use strict';

angular.module('myApp.feedview')
    .controller('CurrCntrl', function($scope,$location,$http,BASEURL,$mdDialog,$rootScope) {
        $scope.selhistory = $rootScope.selhistory;
        $scope.starPath = $rootScope.starPath;
        console.log($scope.selhistory);
    })

    .directive('mvUserFeed', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/userfeedback/userfeedback.html'
        };
    })
;

'use strict';

angular.module('myApp.dashboard')
    .controller('SubscriptionCtrl',function($scope) {
        $scope.days = 100;
        $scope.daysRem = 50;
        $scope.progressBarType = 'alert';
    })
    .directive('mvSubscriptionCard', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/subscription/subscription.html',
            controller:'SubscriptionCtrl'
        };
    });

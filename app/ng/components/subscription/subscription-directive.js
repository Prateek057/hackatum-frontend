'use strict';

angular.module('myApp.dashboard')
    .controller('SubscriptionCtrl',function($scope,currUser) {
        $scope.user = currUser.getUser();
        $scope.days = 30;
        var oneDay = 24*60*60*1000;
        var expDate = new Date($scope.user.expDate);

        var currDate = new Date();

        var diffDays = Math.round(Math.abs((expDate.getTime()-currDate.getTime() )/(oneDay)));

        if(isNaN(diffDays)){
            $scope.daysRem = 1;
        }else{
            $scope.daysRem = diffDays;
        }
        $scope.progressBarType = 'warning';
    })
    .directive('mvSubscriptionCard', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/subscription/subscription.html',
            controller:'SubscriptionCtrl'
        };
    });

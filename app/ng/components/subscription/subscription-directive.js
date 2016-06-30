'use strict';

angular.module('myApp.dashboard')
    .controller('SubscriptionCtrl',function($scope,currUser) {
        $scope.user = currUser.getUser();
        $scope.days = 30;
        var oneDay = 24*60*60*1000;
        var regDate = new Date($scope.user.regDate);
        var expDate = new Date($scope.user.expDate);

        regDate = formatDate(regDate);
        expDate = formatDate(expDate);

        var diffDays = Math.round(Math.abs((regDate.getTime() - expDate.getTime())/(oneDay)));

        $scope.daysRem = diffDays;
        $scope.progressBarType = 'warning';

        function formatDate(date){
            var dd = date.getDate();
            var mm = date.getMonth()+1; //January is 0!

            var yyyy = date.getFullYear();
            if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
            var date = dd+'/'+mm+'/'+yyyy;
            var fdate = new Date(date);
            return fdate;
        }


    })
    .directive('mvSubscriptionCard', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/subscription/subscription.html',
            controller:'SubscriptionCtrl'
        };
    });

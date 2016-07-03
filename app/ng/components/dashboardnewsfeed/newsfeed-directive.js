'use strict';

angular.module('myApp.dashboard')

    .directive('mvDashboardNewsFeed', function() {
        return {
            restrict: 'A',
            templateUrl: 'components/dashboardnewsfeed/newsfeed.html'
        };
    });

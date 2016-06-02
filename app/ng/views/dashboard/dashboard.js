/**
 * Created by Akash on 5/31/2016.
 */
'use strict';

angular.module('myApp.dashboard')

    .constant('dashboardState', {
        name: 'dashboard.detail',
        options: {
            url: '',

            views: {
                "content@root": {
                    templateUrl: 'views/dashboard/dashboard.html',
                    controller: 'DashboardCtrl'
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "Dashboard"
            }
        }
    })
    .controller('DashboardCtrl', function($scope, Dashboard, $mdToast, $mdDialog, $stateParams, $state, currUser,$http) {

        var dashboardDetailsPromise =  Dashboard.query(function(){

            var dashboardDetails = [];

            for(var ctr=0;ctr<dashboardDetailsPromise.length;ctr++){
                dashboardDetails.push(dashboardDetailsPromise[ctr]);
            }

            $scope.dashboardTable = dashboardDetails;

        });

        $scope.determinateValue = 30;
        $scope.pieChartLabels = ["Number of Days left","Total number of days"];
        $scope.pieChartData = [100,200];
        $scope.pieChartColors = ["rgba(255, 0, 0, 1)","rgba(0, 255 ,0, 1)"];

        $scope.subsdays = 10;



    });
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

        var dashboardDetailsPromise = Dashboard.query();
        console.log(dashboardDetailsPromise);
        //dashboardDetailsPromise.

        /*$http({
            method: 'GET',
            url: 'http://localhost:3000/api/dashboard'
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.dashboardTable = response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });*/

    });
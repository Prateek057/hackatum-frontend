/**
 * Created by Akash on 5/31/2016.
 */
'use strict';

angular.module('myApp.learningcenter')
    .constant('learningcenterState', {
        name: 'learningcenter.detail',
        options: {
            url: '',
            views: {
                "content@root": {
                    templateUrl: 'views/learningcenter/learningcenter.html',
                    controller: 'LearningCenterCtrl'
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "Learning Center"
            }
        }
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])
    .controller('LearningCenterCtrl', function($scope,  $mdToast, $mdDialog,$mdMedia, $mdSidenav,
                                               currUser, $location) {

        $scope.authed = false;

        $scope.$watch(function () {
            return currUser.loggedIn();
        }, function (loggedIn) {
            $scope.authed = loggedIn;
            if (!$scope.authed) {
                $location.path('/landing');
            }
        });

        $scope.isSidenavOpen = false;

        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };

    });

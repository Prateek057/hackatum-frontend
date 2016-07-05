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
                                               currUser, $location, $http, BASEURL,$rootScope) {

        $scope.authed = false;

        $scope.$watch(function () {
            return currUser.loggedIn();
        }, function (loggedIn) {
            $scope.authed = loggedIn;
            if (!$scope.authed) {
                $location.path('/landing');
            }
        });

        $scope.showResultDiv = false;
        $scope.patternEnabled = false;
        $scope.antipatternEnabled = false;
        $scope.loadMenu = function(option) {
            //$scope.result = "";

            $scope.showResultDiv = false;
            if(option==='pattern'){
                $scope.patternEnabled = true;
                $scope.antipatternEnabled = false;
                $scope.resultType='pattern';
                $http.get(BASEURL+'/api/patternnamelist')
                    .then(function successCallback(response) {
                        $scope.sidenavheader = "Pattern List";
                        $scope.list = response.data;
                    }, function errorCallback(response) {

                    });
            }
            else if (option==='antipatterns'){
                $scope.patternEnabled = false;
                $scope.antipatternEnabled = true;
                $scope.resultType='antipatterns';
                $http.get(BASEURL+'/api/antipatternnamelist')
                    .then(function successCallback(response) {
                        $scope.sidenavheader = "Antipattern List";
                        $scope.list = response.data;
                    }, function errorCallback(response) {

                    });
            }
        };

        $scope.getDetails = function(pattern){
            $scope.showResultDiv = true;
            $scope.pattern = pattern;
            var url = BASEURL+'/api/'+$scope.resultType+'/byName/'+pattern;
            $http.get(url)
                .then(function successCallback(response) {
                    $scope.result = response.data;
                }, function errorCallback(response) {
                    console.log("error")
                });
        }
    });

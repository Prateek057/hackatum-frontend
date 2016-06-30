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
                                               currUser, $location, $http, BASEURL) {

        $scope.authed = false;

        $scope.$watch(function () {
            return currUser.loggedIn();
        }, function (loggedIn) {
            $scope.authed = loggedIn;
            if (!$scope.authed) {
                $location.path('/landing');
            }
        });


        $scope.loadMenu = function(option) {
            $scope.result = "";
            if(option==='pattern'){
                $scope.resultType='pattern';
                $http.get(BASEURL+'/api/patternnamelist')
                    .then(function successCallback(response) {
                        $scope.sidenavheader = "Pattern List";
                        $scope.list = response.data;
                    }, function errorCallback(response) {

                    });
            }
            else if (option==='antipatterns'){
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
            console.log(pattern);
            $scope.pattern = pattern;
            var url = BASEURL+'/api/'+$scope.resultType+'/byName/'+pattern;
            console.log(url);
            $http.get(url)
                .then(function successCallback(response) {
                    console.log(response.data[0]);
                    $scope.result = response.data[0];
                }, function errorCallback(response) {
                    console.log("error")
                });
        }
    });

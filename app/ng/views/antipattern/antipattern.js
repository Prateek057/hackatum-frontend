/**
 * Created by Akash on 5/31/2016.
 */
'use strict';

angular.module('myApp.antipattern')
    .constant('antipatternState', {
        name: 'antipattern.detail',
        options: {
            url: '',
            views: {
                "content@root": {
                    templateUrl: 'views/antipattern/antipattern.html',
                    controller: 'AntipatternCtrl'
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "Antipattern"
            }
        }
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])
    .controller('AntipatternCtrl', function($scope, Antipattern, $mdToast, $mdDialog,$mdMedia, currUser, $location) {

        $scope.authed = false;

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            $scope.authed = loggedIn;
            if(!$scope.authed){
                $location.path('/landing');
            }
        });

        $scope.showresult = false;

        var antipatternsPromise =  Antipattern.query(function(){

            console.log(antipatternsPromise);
            var antipatterns = [];

            for(var ctr=0;ctr<antipatternsPromise.length;ctr++){
                antipatterns.push(antipatternsPromise[ctr]);
            }

            $scope.antipatterns = antipatterns;
            $scope.selected = [];
            $scope.toggle = function (antipattern, list) {
                var idx = list.indexOf(antipattern);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(antipattern);
                }
            };
            $scope.exists = function (antipattern, list) {
                return list.indexOf(antipattern) > -1;
            };

        });

        $scope.showantipattern = function(){
            console.log($scope.selected);
            $scope.showresult = true;
        }

    });
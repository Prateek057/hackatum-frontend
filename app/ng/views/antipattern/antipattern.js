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
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])
    .controller('AntipatternCtrl', function ($scope, Antipattern, $mdToast, $mdDialog, $mdMedia,
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
        $scope.addYourUserStory = true;
        var antipatternsPromise = Antipattern.query(function () {

            var antipatterns = [];

            for (var ctr = 0; ctr < antipatternsPromise.length; ctr++) {
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

        $scope.showantipattern = function (event) {

            var useFullScreen = ( $mdMedia('xs'));
            var useCaseName = $scope.apUseCaseName;
            var useCaseDesc = $scope.apUseCaseDesc;
            var user = currUser.getUser().username;
            console.log(user);
            console.log($scope.apUseCaseName);
            console.log($scope.apUseCaseName);
            var analysisResult = [];
            $scope.selected.forEach(function(selected){
                analysisResult.push(selected.apname);
            });
            console.log(analysisResult);

            postFeedback(user, useCaseDesc, useCaseName, analysisResult);

            $mdDialog.show({
                clickOutsideToClose: false,
                scope: $scope,
                fullscreen: useFullScreen,
                preserveScope: true,
                templateUrl: 'components/ap-result/ap-result.html',
                openFrom: '#left',
                controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    }
                }
            });
        };

        $scope.showAntipatterndiv = function(){
            console.log($scope.apUseCaseDesc);
            $scope.addYourUserStory = false;
            $scope.showAntipatternList = true;
            var ele = document.getElementById('antipatterndiv');
            window.scrollTo(ele.offsetLeft,ele.offsetTop);
        };

        function postFeedback(user, userStoryDesc, userStoryName, analysisResult) {
            console.log(user);
            return $http.post(BASEURL + '/api/allHistory', {
                username: user,
                userStoryDesc: userStoryDesc,
                userStoryName: userStoryName,
                analysisResult: analysisResult,
                analysisDate: new Date()
            });
        }
    });
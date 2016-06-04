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
    .controller('DashboardCtrl', function($scope, Dashboard, $mdToast, $mdDialog,$mdMedia,
                                          $stateParams, $state, currUser,$http) {

        var dashboardDetailsPromise =  Dashboard.query(function(){

            var dashboardDetails = [];

            for(var ctr=0;ctr<dashboardDetailsPromise.length;ctr++){
                dashboardDetails.push(dashboardDetailsPromise[ctr]);
            }

            $scope.dashboardTable = dashboardDetails;

        });

        /*$scope.days = 100;
        $scope.daysRem = 50;
        $scope.progressBarType = 'alert';*/

        $scope.pieChartLabels = ["5 Star","4 Star","3 Star","2Star","1Star"];
        $scope.pieChartData = [5,4,3,2,1];

        $scope.subsdays = 10;

        $scope.showFeedbackForm = function(ev){

            var useFullScreen = ( $mdMedia('xs'));
            $mdDialog.show({
                    controller: "CreateMovieCtrl",
                    templateUrl: 'components/feedback/feedback.html',
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: useFullScreen,
                    preserveScope:true
                })
                .then(function(answer) {

                    if (answer) {
                        showSimpleToast('Thank you for the feedback');
                    } else {
                        showSimpleToast('An Error occured!');
                    }
                }, function() {
                    showSimpleToast('Feedback not submitted');
                });
            function showSimpleToast(txt){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(txt)
                        .position('bottom right')
                        .hideDelay(3000)

                );
            }

        }

        $scope.starRating0 = 0;
        $scope.starRating1 = 4;
        $scope.starRating2 = 5;
        $scope.starRating3 = 2;
        $scope.hoverRating1 = $scope.hoverRating2 = $scope.hoverRating3 = 0;

        $scope.click1 = function (param) {
            console.log('Click(' + param + ')');
            console.log(param);
        };

        $scope.mouseHover1 = function (param) {
            $scope.hoverRating1 = param;
        };

        $scope.mouseLeave1 = function (param) {
            $scope.hoverRating1 = param + '*';
        };

        $scope.click2 = function (param) {
            console.log('Click');
            console.log(param);
        };

        $scope.mouseHover2 = function (param) {
            $scope.hoverRating1 = param;
        };

        $scope.mouseLeave2 = function (param) {
            $scope.hoverRating2 = param + '*';
        };

        $scope.click3 = function (param) {
            console.log('Click');
            console.log(param);
        };

        $scope.mouseHover3 = function (param) {
            $scope.hoverRating3 = param;
        };

        $scope.mouseLeave3 = function (param) {
            $scope.hoverRating3 = param + '*';
        };
    });

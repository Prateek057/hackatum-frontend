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
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])
    .controller('DashboardCtrl', function($scope, Dashboard, $mdToast, $mdDialog,$mdMedia, currUser, $location) {

        $scope.authed = false;

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            $scope.authed = loggedIn;
            if(!$scope.authed){
                $location.path('/landing');
            }
        });

        var dashboardDetailsPromise =  Dashboard.query(function(){

            var dashboardDetails = [];

            for(var ctr=0;ctr<dashboardDetailsPromise.length;ctr++){
                dashboardDetails.push(dashboardDetailsPromise[ctr]);
            }

            $scope.dashboardTable = dashboardDetails;


            var one=0;var two=0;var three=0;var four=0;var five=0;

            for(var ctr=0;ctr<dashboardDetails.length;ctr++){
                if(dashboardDetails[ctr].resultRating=='1')
                    one++;
                else if(dashboardDetails[ctr].resultRating=='2')
                    two++;
                else if(dashboardDetails[ctr].resultRating=='3')
                    three++;
                else if(dashboardDetails[ctr].resultRating=='4')
                    four++;
                else if(dashboardDetails[ctr].resultRating=='5')
                    five++;
            }
            $scope.pieChartLabels = ["1 Star","2 Star","3 Star","4 Star","5 Star"];
            $scope.pieChartData = [one,two,three,four,five ];

        });

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
        $scope.starRating1 = 1;
        $scope.starRating2 = 2;
        $scope.starRating3 = 3;
        $scope.starRating4 = 4;
        $scope.starRating5 = 5;
        /*//$scope.hoverRating1 = $scope.hoverRating2 = $scope.hoverRating3 = 0;

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
        };*/
    });

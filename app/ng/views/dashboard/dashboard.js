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
    .controller('DashboardCtrl', function($scope, Dashboard, $mdToast, $mdDialog,$mdMedia,currUser) {

        /*$scope.user = null;

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            $scope.loggedIn = loggedIn;
            if (loggedIn && !$scope.user) {
                $scope.user = currUser.getUser();

            }
        });
        */

        var dashboardDetailsPromise =  Dashboard.query(function(){

            var dashboardDetails = [];

            for(var ctr=0;ctr<dashboardDetailsPromise.length;ctr++){
                dashboardDetails.push(dashboardDetailsPromise[ctr]);
            }

            $scope.dashboardTable = dashboardDetails;


            var one=0;var two=0;var three=0;var four=0;var five=0;

            for(var ctr=0;ctr<dashboardDetails.length;ctr++){
                if(dashboardDetails[ctr].usecaseRating=='1')
                    one++;
                else if(dashboardDetails[ctr].usecaseRating=='2')
                    two++;
                else if(dashboardDetails[ctr].usecaseRating=='3')
                    three++;
                else if(dashboardDetails[ctr].usecaseRating=='4')
                    four++;
                else if(dashboardDetails[ctr].usecaseRating=='5')
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

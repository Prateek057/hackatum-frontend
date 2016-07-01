/**
 * Created by Akash on 6/4/2016.
 */
angular.module('myApp.dashboard')
    .controller('FeedbackCtrl', function($scope, Dashboard, $mdDialog, $rootScope, currUser,$http,BASEURL) {

        $scope.number = 5;
        $scope.getNumber = function(num) {
            return new Array(num);
        }

        $scope.saveSome = function() {
            console.log("In save...");
            console.log($rootScope.selectedHistory);
            $rootScope.selectedHistory.userFeedback = document.getElementById('feed').value;
            $rootScope.selectedHistory.resultRating = 1;
            $http.put(BASEURL+'/api/submitFeedback/', $rootScope.selectedHistory)
                .then(function successCallback(response) {
                    console.log("Success");
                }, function errorCallback(response) {
                    console.log("Failure");
                });
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

    });
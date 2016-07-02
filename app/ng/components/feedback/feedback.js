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
            if(!$rootScope.starRating){
                console.log("Not defined");
                $mdDialog.cancel();
            }
            else{
                $rootScope.selectedHistory.resultRating = $rootScope.starRating;
                $http.put(BASEURL+'/api/submitFeedback/', $rootScope.selectedHistory)
                    .then(function successCallback(response) {
                        console.log("Success");
                    }, function errorCallback(response) {
                        console.log("Failure");
                    });
                $mdDialog.cancel();
            }
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.closeDialog = function () {
            $mdDialog.hide();
        }

    });
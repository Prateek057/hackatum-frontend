angular.module('myApp.dashboard')
    .controller('FeedbackCtrl', function($scope, Dashboard, $mdDialog, $rootScope, currUser,$http,BASEURL,$mdToast) {

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
                showSimpleToast('Feedback was not submitted');
                $mdDialog.cancel();
            }
            else{
                $rootScope.selectedHistory.resultRating = $rootScope.starRating;
                $http.put(BASEURL+'/api/submitFeedback/', $rootScope.selectedHistory)
                    .then(function successCallback(response) {
                        console.log("Success");
                        showSimpleToast('Thank you for the feedback');
                    }, function errorCallback(response) {
                        showSimpleToast('An Error occured!');
                    });
                $mdDialog.cancel();
            }
        };

        function showSimpleToast(txt){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
        
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.closeDialog = function () {
            $mdDialog.hide();
        }

    });
/**
 * Created by Akash on 6/4/2016.
 */
angular.module('myApp.dashboard')
    .controller('FeedbackCtrl', function($scope, Dashboard, $mdDialog, $rootScope, currUser) {

        $scope.number = 5;
        $scope.getNumber = function(num) {
            return new Array(num);
        }

        $scope.save = function() {
            $scope.movie.user = currUser.getUser()._id;
            $scope.movie.$save()
                .then(function(){
                    $rootScope.$broadcast('movieCreated', $scope.movie);
                    $mdDialog.hide(true);
                }).catch(function(){
                $mdDialog.hide(false);
            });
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

    });
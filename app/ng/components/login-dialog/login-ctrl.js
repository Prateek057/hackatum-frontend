angular.module('myApp')
    .constant()
    .controller("login", function ($scope, currUser, $mdDialog, $location) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.errorText = '';

        $scope.login = login;
        $scope.cancel = cancel;

        function login() {
            currUser.login($scope.username, $scope.password).then(function () {
                $location.path('/dashboard');
                $mdDialog.hide();
            }, function (response) {
                status = response.status;
                //console.log(response.status == 400 || response.status == 401);
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "Wrong username or password.";
                } else {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }
    });

angular.module('myApp')
    .constant()
    .controller("login", function ($scope, currUser, $mdDialog, $location,$rootScope,$http,BASEURL) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.errorText = '';

        $scope.login = login;
        $scope.cancel = cancel;

        function login() {
            currUser.login($scope.username, $scope.password).then(function () {
                console.log("In alogin");
                $rootScope.isAdmin = currUser.getUser().isAdmin;
                if($rootScope.isAdmin){
                    $location.path('/stats');
                }else{
                    $location.path('/dashboard');
                }
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

angular.module('myApp')
    .controller("register", function ($scope, currUser, $mdDialog) {
        $scope.username = '';
        $scope.email = '';
        $scope.pwd = '';
        $scope.pwdConfirm;
        $scope.errorText = '';

        $scope.register = register;
        $scope.cancel = cancel;


        $scope.regDate = new Date();
        $scope.expDate = new Date(
            $scope.regDate.getFullYear(),
            $scope.regDate.getMonth(),
            $scope.regDate.getDate() + 30);


        function register() {
            currUser.register($scope.username, $scope.email, $scope.pwd, $scope.regDate, $scope.expDate).then(function () {
                $mdDialog.hide();
            }, function (response) {
                debugger;
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }
    });

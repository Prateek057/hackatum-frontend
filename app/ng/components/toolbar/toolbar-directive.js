angular.module('myApp')
    .directive('mvToolbar', function() {
        return {
            restrict: "A",
            templateUrl: "components/toolbar/toolbar.html",
            controller: function($scope, currUser, $mdDialog, $mdMedia, $mdToast, $location, $window) {

                $scope.user = null;

                $scope.showLoginDialog = showLoginDialog;
                $scope.showSignupDialog = showSignupDialog;
                $scope.logout = logout;

                $scope.dashboardEnabled = false;
                $scope.patternEnabled = false;
                $scope.antipatternEnabled = false;
                $scope.lcEnabled = false;

                $scope.go = function ( path,selected ) {
                    console.log(selected);

                    if(selected=="dashboard"){
                        $scope.dashboardEnabled = true;
                        $scope.patternEnabled = false;
                        $scope.antipatternEnabled = false;
                        $scope.lcEnabled = false;
                    }
                    else if(selected=="pattern"){
                        $scope.dashboardEnabled = false;
                        $scope.patternEnabled = true;
                        $scope.antipatternEnabled = false;
                        $scope.lcEnabled = false;
                    }
                    else if(selected=="antipattern"){
                        $scope.dashboardEnabled = false;
                        $scope.patternEnabled = false;
                        $scope.antipatternEnabled = true;
                        $scope.lcEnabled = false;
                    }
                    else if(selected=="lc"){
                        $scope.dashboardEnabled = false;
                        $scope.patternEnabled = false;
                        $scope.antipatternEnabled = false;
                        $scope.lcEnabled = true;
                    }

                    $location.path( path );

                };

                $scope.$watch(function(){
                    return currUser.loggedIn();
                }, function(loggedIn){
                    $scope.loggedIn = loggedIn;
                    if (loggedIn && !$scope.user){

                        $scope.user = currUser.getUser();
                    }
                });

                /////////////////////

                function showLoginDialog(){
                    var useFullScreen = $mdMedia('xs');
                    $mdDialog.show({
                        controller: 'login', 
                        templateUrl: 'components/login-dialog/login-dialog.html',
                        clickOutsideToClose:true,
                        fullscreen: useFullScreen
                    });
                }
                function showSignupDialog(){
                    var useFullScreen = $mdMedia('xs');
                    $mdDialog.show({
                        controller: 'register',
                        templateUrl: 'components/register-dialog/register-dialog.html',
                        clickOutsideToClose:true,
                        fullscreen: useFullScreen
                    });
                }

                function logout(){
                    currUser.logout();
                }

                function showSimpleToast(txt){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(txt)
                            .position('bottom right')
                            .hideDelay(3000)

                    );
                }
            }
        }
    });
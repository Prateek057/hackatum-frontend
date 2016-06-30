(function(){

    angular.module('myApp')
        .service('currUser', currUserService);

    function currUserService(BASEURL, $http, auth, $location) {

        this.register = register;
        this.login = login;
        this.loggedIn = auth.isAuthed;
        this.logout = logout;
        this.getUser = getUser;


        ////////////////

        function register(user, email, pass, regdate, expdate) {
            return $http.post(BASEURL + '/signup', {
                username: user,
                email: email,
                password: pass,
                regDate: regdate,
                expDate: expdate
            });
        }

        function login(user, pass) {
            return $http.post(BASEURL + '/login', {
                username: user,
                password: pass
            });
        }

        function logout(){
            auth.deleteToken();
            $scope.user = null;
            $location.path('/landing');
        }

        function getUser() {
            var token = auth.getToken();
            return token? auth.parseJwt(token).user : {};
        }
    }

})();

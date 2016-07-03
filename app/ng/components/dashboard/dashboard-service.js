'use strict';

angular.module('myApp.dashboard')

    .factory('Dashboard', function($resource,currUser,BASEURL) {
        var user = currUser.getUser();
        var url = BASEURL+'/api/history/'+user.username;
        return $resource(BASEURL+'/api/history/'+user.username);
    });
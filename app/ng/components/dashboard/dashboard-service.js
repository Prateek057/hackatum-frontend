/**
 * Created by Akash on 6/2/2016.
 */
'use strict';

angular.module('myApp.dashboard')

    .factory('Dashboard', function($resource,currUser) {
        var user = currUser.getUser();
        console.log(user.username);
        return $resource('http://localhost:3000/api/history/'+user.username);
    });
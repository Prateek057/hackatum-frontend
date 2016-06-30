/**
 * Created by Akash on 6/17/2016.
 */
'use strict';

angular.module('myApp.antipattern')

    .factory('Antipattern', function($resource) {
        return $resource('http://localhost:3000/api/antipatterns');
    });
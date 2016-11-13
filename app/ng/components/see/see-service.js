'use strict';

angular.module('myApp.see')

    .factory('See', function( $resource, BASEURL) {
        return $resource(BASEURL + '/line');
    });
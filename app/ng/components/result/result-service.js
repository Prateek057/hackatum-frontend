/**
 * Created by prate_000 on 02-06-2016.
 */
'use strict';

angular.module('myApp.result')

    .factory('PatternByName', function( $resource) {
        return $resource('http://localhost:3000/api/patterns');
    })

;
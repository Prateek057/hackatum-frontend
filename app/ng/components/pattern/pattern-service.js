/**
 * Created by prate_000 on 02-06-2016.
 */
'use strict';

angular.module('myApp.pattern')

    .factory('Pattern', function( $resource) {
        return $resource('http://localhost:3000/api/patterns');

    })

    .factory('Question', function($resource){
        return $resource('http://localhost:3000/api/questions');
    })

;
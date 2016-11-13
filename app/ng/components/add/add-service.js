'use strict';

angular.module('myApp.add')

    .factory('See', function( $resource, BASEURL) {
        return $resource(BASEURL + '/line');
    })
    .factory('Station', function ($resource, BASEURL) {
        return {
            query: function (line) {
                return $resource(BASEURL + '/station/byLine/' + line, {}, {
                    query: {
                        method: 'GET',
                        isArray: true
                    }
                }).query();
            }
        }
    })

;
'use strict';

angular.module('myApp.see')

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
    .factory('Location', function ($resource, GOOBASEURL, APIKEY) {
        return {
            query: function (location) {
                return $resource(GOOBASEURL + location + ',Munich&key='+APIKEY, {}, {
                    query: {
                        method: 'GET' /*,
                        isArray: true*/
                    }
                }).query();
            }
        }
    })
    .factory('Livestatus', function ($resource, BASEURL) {
        return {
            query: function (location) {
                return $resource(BASEURL + '/live/' + location, {}, {
                    query: {
                        method: 'GET' /*,
                         isArray: true*/
                    }
                }).query();
            }
        }

    })

;
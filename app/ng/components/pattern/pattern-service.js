/**
 * Created by prate_000 on 02-06-2016.
 */
'use strict';

angular.module('myApp.pattern')

    .factory('Pattern', function ($resource) {
        return $resource('http://localhost:3000/api/patterns');
    })
    .factory('PatternByName', function ($resource) {
        return {
            query: function (patternName) {
                return $resource('http://localhost:3000/api/pattern/byName/' + patternName, {}, {
                    query: {
                        method: 'GET',
                        isArray: true
                    }
                }).query();
            }
        }
    })

    /*.factory('QuestionsByPhase', function($resource, phaseId){
     return $resource('http://localhost:3000/api/questions/byPhase/'+phaseId);
     })*/
    .factory('QuestionsByPhase', function ($resource) {

        return {

            query: function (phaseId) {
                return $resource('http://localhost:3000/api/questions/byPhase/' + phaseId, {}, {
                    query: {method: 'GET', params: {questionPhase: phaseId}, isArray: true}
                }).query();

            }
        }
    })
    /*.factory('QuestionsByPatternType', function($resource){
     return{
     query: function(phaseType){

     return $resource('http://localhost:3000/api/questions/byPatternType/' + phaseType, {}, {
     query: {
     method: 'GET',
     isArray: true,
     transformResponse: function (data) {
     return angular.fromJson(data).items;
     }
     }
     });
     }
     }
     })*/
    .factory('QuestionsByPatternType', function ($resource, $q) {
        return {
            query: function (phaseType) {
                var deferred = $q.defer();
                return $resource('http://localhost:3000/api/questions/byPatternType/' + phaseType, null, {
                    query: {
                        method: 'GET',
                        isArray: true
                    }
                }).query();
            }
        }
    })
    .factory('Question', function ($resource) {
        return $resource('http://localhost:3000/api/questions');
    })

;
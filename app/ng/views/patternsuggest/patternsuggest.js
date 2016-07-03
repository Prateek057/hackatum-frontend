/**
 * Created by Gopala on 02-Jul-16.
 */

'use strict';

angular.module('myApp.patternsuggest')
    .constant('suggestState', {
        name: 'patternsuggest.detail',
        options: {
            url: '',

            views: {
                "content@root": {
                    templateUrl: 'views/patternsuggest/patternsuggest.html',
                    controller: 'SuggestCtrl'
                }
            },
            ncyBreadcrumb: {
                label: "patternsuggest"
            }
        }
    })
    .controller('SuggestCtrl', function($scope,$location, $http, BASEURL, $q) {
        $scope.goOn = function ( path,selected ) {
            console.log(selected);
            $location.path( path );

        };
        
        $scope.imagePath = '../data/img/user.png';
        $scope.suggestions = null;
        $http.get(BASEURL+'/api/suggestPattern')
            .then(function successCallback(response) {
                $scope.suggestions = response.data;
                console.log($scope.suggestions);
            }, function errorCallback(response) {
                console.log("Could not get suggestions");
            });

        $scope.openSuggestion = function(someSuggestion){
            var elem = document.getElementById("suggestionContent");
            $scope.selsuggestion = someSuggestion;
            //elem.innerHTML += '<h2 class="md-title"> From: ' + $scope.thisusername + "</h2>";
            //elem.innerHTML += '<p>' + $scope.thiscontent + '</p>';
        }
    });
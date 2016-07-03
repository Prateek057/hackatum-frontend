/**
 * Created by Gopala on 03-Jul-16.
 */

'use strict';

angular.module('myApp.feedview')
    .controller('CurrCntrl', function($scope,$location,$http,BASEURL,$mdDialog,$rootScope) {
        $scope.selhistory = $rootScope.selhistory;
        console.log($scope.selhistory);
    })

    .directive('mvUserFeed', function() {
        return {
            restrict: 'E',
            //scope: {
            //    selhistory: '='
            //},
            templateUrl: 'components/userfeedback/userfeedback.html'
        };
    })
;

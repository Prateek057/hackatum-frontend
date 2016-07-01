/**
 * Created by Gopala on 30-Jun-16.
 */

'use strict';

angular.module('myApp.feedview')
    .constant('feedbackVState', {
        name: 'feedview.detail',
        options: {
            url: '',

            views: {
                "content@root": {
                    templateUrl: 'views/feedview/feedview.html',
                    controller: 'FeedbckCtrl'
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "Feedbackss"
            }
        }
    })
    .controller('FeedbckCtrl', function($scope,$location,$http,BASEURL) {
        $scope.historys = null;
        $http.get(BASEURL+'/api/validFeedbacks')
            .then(function successCallback(response) {
                $scope.historys = response.data;
                console.log($scope.latestPattern);
            }, function errorCallback(response) {


            });

        $scope.imagePath = '../data/img/email-filled-closed-envelope.png';
        //$scope.historys = [
        //    {
        //        face : imagePath,
        //        userStoryName: 'Example User Story',
        //        username: 'User0001',
        //        analysisDate: '3:08PM',
        //        userFeedback: "Sed vel feugiat metus, sit amet elementum diam. Morbi at cursus est, ac viverra dui. Nam vel enim pretium, posuere dui eu, tincidunt ligula. Vivamus pretium orci nec magna laoreet, sed placerat justo elementum. Donec feugiat ligula quis tortor placerat congue. Morbi id dapibus enim. Vestibulum enim enim, accumsan ut convallis quis, molestie maximus orci. Sed eget est felis. Phasellus dapibus, magna sed semper mollis, enim nulla maximus velit, vitae vehicula libero nisi at nulla."
        //    },
        //    {
        //        face : imagePath,
        //        userStoryName: 'Example User Story',
        //        username: 'User0001',
        //        analysisDate: '3:08PM',
        //        userFeedback: "Sed vel feugiat metus, sit amet elementum diam. Morbi at cursus est, ac viverra dui. Nam vel enim pretium, posuere dui eu, tincidunt ligula. Vivamus pretium orci nec magna laoreet, sed placerat justo elementum. Donec feugiat ligula quis tortor placerat congue. Morbi id dapibus enim. Vestibulum enim enim, accumsan ut convallis quis, molestie maximus orci. Sed eget est felis. Phasellus dapibus, magna sed semper mollis, enim nulla maximus velit, vitae vehicula libero nisi at nulla."
        //    },
        //    {
        //        face : imagePath,
        //        userStoryName: 'Example User Story',
        //        username: 'User0001',
        //        analysisDate: '3:08PM',
        //        userFeedback: "Sed vel feugiat metus, sit amet elementum diam. Morbi at cursus est, ac viverra dui. Nam vel enim pretium, posuere dui eu, tincidunt ligula. Vivamus pretium orci nec magna laoreet, sed placerat justo elementum. Donec feugiat ligula quis tortor placerat congue. Morbi id dapibus enim. Vestibulum enim enim, accumsan ut convallis quis, molestie maximus orci. Sed eget est felis. Phasellus dapibus, magna sed semper mollis, enim nulla maximus velit, vitae vehicula libero nisi at nulla."
        //    },
        //    {
        //        face : imagePath,
        //        userStoryName: 'Example User Story',
        //        username: 'User0001',
        //        analysisDate: '3:08PM',
        //        userFeedback: "Sed vel feugiat metus, sit amet elementum diam. Morbi at cursus est, ac viverra dui. Nam vel enim pretium, posuere dui eu, tincidunt ligula. Vivamus pretium orci nec magna laoreet, sed placerat justo elementum. Donec feugiat ligula quis tortor placerat congue. Morbi id dapibus enim. Vestibulum enim enim, accumsan ut convallis quis, molestie maximus orci. Sed eget est felis. Phasellus dapibus, magna sed semper mollis, enim nulla maximus velit, vitae vehicula libero nisi at nulla."
        //    },
        //    {
        //        face : imagePath,
        //        userStoryName: 'Example User Story',
        //        username: 'User0001',
        //        analysisDate: '3:08PM',
        //        userFeedback: "Sed vel feugiat metus, sit amet elementum diam. Morbi at cursus est, ac viverra dui. Nam vel enim pretium, posuere dui eu, tincidunt ligula. Vivamus pretium orci nec magna laoreet, sed placerat justo elementum. Donec feugiat ligula quis tortor placerat congue. Morbi id dapibus enim. Vestibulum enim enim, accumsan ut convallis quis, molestie maximus orci. Sed eget est felis. Phasellus dapibus, magna sed semper mollis, enim nulla maximus velit, vitae vehicula libero nisi at nulla."
        //    },
        //];
    });
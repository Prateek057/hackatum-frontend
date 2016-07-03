'use strict';

angular.module('myApp.landing')

    .constant('landingState', {
        name: 'landing.detail',
        options: {
            url: '',

            views: {
                "content@root": {
                    templateUrl: 'views/landing/landing.html',
                    controller: 'LandingCtrl'
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "Landing"
            }
        }
    })
    .controller('LandingCtrl', function($scope,$location,$http,BASEURL, $mdDialog) {

        $scope.baseIndex = 1;


        $scope.gallery = [
            {image: '../data/img/3288.jpg', description: 'Image 00'},
            {image: '../data/img/twitter.png', description: 'Image 01'},
            {image: '../data/img/facebook-logo.png', description: 'Image 02'}
        ];

        $scope.slides = [
            {image: '../data/img/3288.jpg', description: 'Image 00'},
            {image: '../data/img/twitter.png', description: 'Image 01'},
            {image: '../data/img/facebook-logo.png', description: 'Image 02'}
        ];
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };
        $scope.prevSlide = function () {
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };

        $scope.height_img = window.innerHeight;
        $scope.mainwidth_img = window.innerWidth;

        $scope.persons = [
            {name: 'Akash Manjunath', role: 'Developer', photo: "../../data/img/team-pics/Akash.jpg"},
            {name: 'Gopala Krishna', role: 'Developer', photo: "../../data/img/team-pics/Krishna.jpg"},
            {name: 'Prateek Bagrecha', role: 'Developer', photo: "../../data/img/team-pics/Prateek.jpg"},
            {name: 'Shankar Mohan', role: 'Developer', photo: "../../data/img/team-pics/Shankar.jpe"}
        ];

        $scope.showTabDialog = function(ev,personname) {
            $mdDialog.show({
                //controller: DialogController,
                templateUrl: 'views/landing/'+personname+'.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })

        };

        $http.get(BASEURL+'/api/validFeedbacks')
            .then(function successCallback(response) {
                $scope.feedbacks = response.data;
                console.log($scope.feedbacks);
            }, function errorCallback(response) {

            });

    })
    .animation('.slide-left-animation', function ($window) {
        return {
            enter: function (element, done) {
                TweenMax.fromTo(element, 1, {left: $window.innerWidth}, {left: 0, onComplete: done});
            },
            leave: function (element, done) {
                TweenMax.to(element, 1, {left: -$window.innerWidth, onComplete: done});
            }
        };
    });
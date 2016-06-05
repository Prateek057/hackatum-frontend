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
    .controller('LandingCtrl', function($scope,$location) {
        $scope.slides = [
            {image: '../data/img/user.png', description: 'Image 00'},
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

        $scope.persons = [
            {name: 'Akash Manjunath', role: 'Developer'},
            {name: 'Gopala Krishna', role: 'Developer'},
            {name: 'Prateek Bagrecha', role: 'Developer'},
            {name: 'Shankar Mohan', role: 'Developer'}
        ];

        $scope.feedbacks = [
            {text: 'I found the website very useful!!', author: 'Krishna'},
            {text: 'Awesome work!', author: 'Akash'},
            {text: 'I found the website very useful!!', author: 'Prateek'},
            {text: 'Awesome work!', author: 'Shankar'},
            {text: 'Awesome work!', author: 'Shankar'}
        ];
    })
    .animation('.slide-animation', function () {
        return {
            addClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    TweenMax.to(element, 0.5, {left: -element.width(), onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    // ANIMATION CODE GOES HERE
                }
                else {
                    done();
                }
            }
        };
    });



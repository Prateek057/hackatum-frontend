'use strict';

angular.module('myApp.add')

    .constant('add', {
        name: 'add.list',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/movies' (because '/movies' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/add/add.html',
                    controller: 'AddListCtrl'
                },
                'outside@root': {
                    templateUrl: 'views/common/backButton.html',
                    controller: 'backButtonCtrl'
                }
            },

            ncyBreadcrumb: {
                label: "Connected Services : Add"
            }

        }

    })

    .controller('AddListCtrl', function($scope, See, Station) {
        var seePromise = See.query(function () {

            var sees = [];

            for (var ctr = 0; ctr < seePromise.length; ctr++) {
                sees.push(seePromise[ctr]);
            }

            $scope.sees = sees;
            console.log($scope.sees);
        });

        $scope.$watch(
            function () {
                return $scope.selectedLine;
            }, function (selectedLine) {
                if (selectedLine !== undefined) {
                    var stationPromise = Station.query(selectedLine).$promise;

                    stationPromise.then(function (data) {
                        if (data.length != 0) {
                            $scope.stations = data;
                        } else {
                            console.log("No Data");
                        }
                    });
                }
            }
        );
    })

    .controller('backButtonCtrl', function($scope, $location){
        $scope.go = function (path) {
            $location.path( path );
        };
    });

'use strict';

angular.module('myApp.see')

    .constant('see', {
        name: 'see.list',
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
                    templateUrl: 'views/see/see.html',
                    controller: 'SeeListCtrl'
                },
                'outside@root': {
                    templateUrl: 'views/common/backButton.html',
                    controller: 'backButtonCtrl'
                }
            },

            ncyBreadcrumb: {
                label: "Connected Services : See"
            }

        }

    })

    .controller('SeeListCtrl', function ($scope, See, Station, $filter, Location, Livestatus) {


        $scope.showMap = false;
        $scope.showLive = false;
        $scope.stationLat = 0;
        $scope.stationLng = 0;
        $scope.map = {center: {latitude: $scope.stationLat, longitude: $scope.stationLng}, zoom: 15};

        var seePromise = See.query(function () {

            var sees = [];

            for (var ctr = 0; ctr < seePromise.length; ctr++) {
                sees.push(seePromise[ctr]);
            }

            $scope.sees = sees;
            console.log($scope.sees);
        });


        $scope.$watch(function () {
            return $scope.selectedStation;
        }, function (selectedStation) {

            var livePromise = Livestatus.query($scope.stationName).$promise;

            livePromise.then(function (data) {
                if (data.length !== undefined)
                    if (data.length !== 0) {
                        console.log(data.length);
                        $scope.results = data.result_sorted;
                        $scope.showLive = true;
                    } else {
                        console.log("No Data");
                    }
            });

            $scope.single_object = $filter('filter')($scope.stations, function (d) {
                return d.id === selectedStation;
            });


            var nextStationId = parseInt(selectedStation) + 1;
            nextStationId = nextStationId.toString();

            $scope.next_object = $filter('filter')($scope.stations, function (d) {
                return d.id === nextStationId;
            });

            var prevStationId = parseInt(selectedStation) - 1;
            prevStationId = prevStationId.toString();

            $scope.prev_object = $filter('filter')($scope.stations, function (d) {
                return d.id === prevStationId;
            });

            if ($scope.single_object !== undefined) {
                $scope.stationServices = $scope.single_object[0].services;
                $scope.stationName = $scope.single_object[0].name;

                var mapPromise = Location.query($scope.stationName).$promise;

                mapPromise.then(function (data) {
                    if (data.length != 0) {
                        $scope.stationLat = data.results[0].geometry.location.lat;
                        $scope.stationLng = data.results[0].geometry.location.lng;
                        $scope.map = {center: {latitude: $scope.stationLat, longitude: $scope.stationLng}, zoom: 15};
                        $scope.showMap = true;
                    } else {
                        console.log("No Data");
                    }
                });
            }
            if ($scope.next_object !== undefined) {
                $scope.nextStationServices = $scope.next_object[0].services;
                $scope.nextStationName = $scope.next_object[0].name;
                $scope.showNext = true;
            }

            if ($scope.prev_object !== undefined) {
                $scope.prevStationServices = $scope.prev_object[0].services;
                $scope.prevStationName = $scope.prev_object[0].name;
                $scope.showPrev = true;
            }

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

    .controller('backButtonCtrl', function ($scope, $location) {
        $scope.go = function (path) {
            $location.path(path);
        };
    });

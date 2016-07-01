'use strict';

angular.module('myApp.stats')
    .constant('statsState', {
        name: 'stats.detail',
        options: {
            url: '',

            views: {
                "content@root": {
                    templateUrl: 'views/stats/stats.html',
                    controller: 'StatsCtrl'
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "Statistics"
            }
        }
    })
    .controller('StatsCtrl', function($scope,$location) {
        $scope.blabels = ['Pattern 1', 'Pattern 2', 'Pattern 3', 'Pattern 4', 'Pattern 5', 'Pattern 6', 'Pattern 7', 'Pattern 8', 'Pattern 9', 'Pattern 10'];
        $scope.bseries = ['Hits'];

        $scope.bdata = [
            [65, 59, 80, 81, 56, 55, 40, 54, 34, 64]
        ];
        $scope.bcolours = [{fillColor:["#FF0000"]}];

        $scope.labels = ["Rated 1", "Rated 2", "Rated 3","Rated 4","Rated 5"];
        $scope.data = [300, 300, 100,344, 234];

        $scope.llabels = ['Pattern 1', 'Pattern 2', 'Pattern 3', 'Pattern 4', 'Pattern 5', 'Pattern 6', 'Pattern 7', 'Pattern 8', 'Pattern 9', 'Pattern 10'];
        $scope.lseries = ['Series A'];
        $scope.ldata = [
            [5, 3, 2, 1.5, 2, 3, 4, 2, 3, 4]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

        $scope.height_chart = window.innerHeight*0.5;
        $scope.mainwidth_chart = window.innerWidth * 0.75;
        $scope.subwidth_chart =  $scope.mainwidth_chart / 2 ;
    });
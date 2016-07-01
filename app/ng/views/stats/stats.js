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
                label: "Statistics"
            }
        }
    })
    .controller('StatsCtrl', function($scope,$location, $http, BASEURL, $q) {


        var patternurl = BASEURL + "/api/patternnamelist";
        var antipatternurl = BASEURL + "/api/antipatterns";
        var historyurl = BASEURL + "/api/allHistory";

        var urls = [];
        urls.push(patternurl);
        urls.push(antipatternurl);
        urls.push(historyurl);

        var urlsPromises = [];
        for (var i = 0; i < urls.length; i++) {
            urlsPromises.push($http.get(urls[i]));
        }

        $q.all(urlsPromises).then(function(response) {
            var patternlist = response[0].data;
            var antipatternlist = response[1].data;
            var historylist = response[2].data;
            var historyresultlist = [];
            for(var ctr=0;ctr<historylist.length;ctr++){
                var result = [];
                result["analysisResult"] = historylist[ctr].analysisResult;
                result["resultRating"] = historylist[ctr].resultRating;
                historyresultlist.push(result);
            }

            //// CREATE CHART DATA FOR PATTERNS

            var patternlabels = []
            $scope.patternvalues = [];
            for(var ctr=0;ctr<patternlist.length;ctr++){
                patternlabels.push(patternlist[ctr].patternName);
                //here iterate over the history list and create values
                var count=0.0;
                var sum=0.0;
                for(var ictr=0;ictr<historyresultlist.length;ictr++){
                    if(patternlist[ctr].patternName==historyresultlist[ictr].analysisResult){
                        sum+=historylist[ctr].resultRating;
                        count++;
                    }
                }
                if(sum==0.0){
                    $scope.patternvalues.push(0);
                }
                else {
                    var avg = sum/count;
                    console.log(avg);
                    $scope.patternvalues.push(avg);
                }
            }
            $scope.patterndata = [
                $scope.patternvalues
            ]
            $scope.patternlabels = patternlabels;
            console.log($scope.patternlabels);
            console.log($scope.patternvalues);

            //// CREATE CHART DATA FOR ANTI-PATTERNS

            var antipatternlabels = []
            $scope.antipatternvalues = [];
            for(var ctr=0;ctr<antipatternlist.length;ctr++){
                antipatternlabels.push(antipatternlist[ctr].apname);
                //here iterate over the history list and create values
                var count=0.0;
                var sum=0.0;
                for(var ictr=0;ictr<historyresultlist.length;ictr++){
                    if(antipatternlist[ctr].apname==historyresultlist[ictr].analysisResult){
                        sum+=historylist[ctr].resultRating;
                        count++;
                    }
                }
                if(sum==0.0){
                    $scope.antipatternvalues.push(0);
                }
                else {
                    var avg = 0.0;
                    avg = sum/count;
                    console.log(avg);
                    $scope.antipatternvalues.push(avg);
                }
            }
            $scope.antipatterndata = [
                $scope.antipatternvalues
            ]
            $scope.antipatternlabels = antipatternlabels;
            console.log($scope.antipatternlabels);
            console.log($scope.antipatternvalues);

        });

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

        $scope.height_chart = window.innerHeight*0.5;
        $scope.mainwidth_chart = window.innerWidth * 0.75;
        $scope.subwidth_chart =  $scope.mainwidth_chart / 2 ;

        /*$scope.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];*/
    });

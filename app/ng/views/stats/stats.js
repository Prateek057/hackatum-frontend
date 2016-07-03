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
        $scope.goOn = function ( path,selected ) {
            console.log(selected);
            $location.path( path );

        };

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
                if(historylist[ctr].resultRating){
                    var analysisResultList = historylist[ctr].analysisResult;
                    for(var ictr=0;ictr<analysisResultList.length;ictr++) {
                        var result = [];
                        result["analysisResult"] = analysisResultList[ictr];
                        result["resultRating"] = historylist[ctr].resultRating;
                        historyresultlist.push(result);
                    }
                }
            }

            //// CREATE CHART DATA FOR PATTERNS

            var patternlabels = [];
            $scope.patternvalues = [];
            for(var ctr=0;ctr<patternlist.length;ctr++){
                patternlabels.push(patternlist[ctr].patternName);
                //here iterate over the history list and create values
                var sum=0;
                var count=0;
                for(var ictr=0;ictr<historyresultlist.length;ictr++){
                    if(patternlist[ctr].patternName===historyresultlist[ictr].analysisResult){
                        sum+=historyresultlist[ictr].resultRating;
                        count++;
                    }
                }
                if(sum==0){
                    $scope.patternvalues.push(0);
                }
                else {
                    var avg = sum/count;
                    $scope.patternvalues.push(avg);
                }
            }
            $scope.patterndata = [
                $scope.patternvalues
            ];
            $scope.patternlabels = patternlabels;

            //// CREATE CHART DATA FOR ANTI-PATTERNS

            var antipatternlabels = [];
            $scope.antipatternvalues = [];

            for(var ctr=0;ctr<antipatternlist.length;ctr++){
                antipatternlabels.push(antipatternlist[ctr].apname);
                //here iterate over the history list and create values
                var count=0;
                var sum=0;
                for(var ictr=0;ictr<historyresultlist.length;ictr++){
                    if(antipatternlist[ctr].apname===historyresultlist[ictr].analysisResult){
                        sum+=historyresultlist[ictr].resultRating;
                        count++;
                    }
                }
                if(sum==0){
                    $scope.antipatternvalues.push(0);
                }
                else {
                    var avg = 0;
                    avg = sum/count;
                    $scope.antipatternvalues.push(avg);
                }
            }
            $scope.antipatterndata = [
                $scope.antipatternvalues
            ]
            $scope.antipatternlabels = antipatternlabels;


            $scope.highchartsNGAntiPattern = {
                options: {
                    chart: {
                        type: 'bar'
                    }
                },
                title: {
                    text: 'Anti-pattern Statistics'
                },
                subtitle: {
                    text: 'Source: TUM Nostradamus'
                },
                xAxis: {
                    categories: $scope.antipatternlabels,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    max: 5,
                    title: {
                        text: 'Average Rating'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 1,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Anti-Pattern performance',
                    data: $scope.antipatternvalues
                }]
            };

            $scope.highchartsNGPattern = {
                options: {
                    chart: {
                        type: 'bar'
                    }
                },
                title: {
                    text: 'Pattern Statistics'
                },
                subtitle: {
                    text: 'Source: TUM Nostradamus'
                },
                xAxis: {
                    categories: $scope.patternlabels,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    max: 5,
                    title: {
                        text: 'Average Rating'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Pattern performance',
                    data: $scope.patternvalues
                }]
            }


        });

        $scope.height_chart = 600;
        $scope.mainwidth_chart = 1000;


    });

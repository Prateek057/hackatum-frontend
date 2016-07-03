'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',
    ['ui.router','ui.bootstrap', 'chart.js', 'myApp.landing', 'myApp.dashboard', 'myApp.pattern',
        'myApp.result', 'templates', 'myApp.antipattern','myApp.learningcenter','myApp.stats','myApp.feedview',
        'myApp.patternsuggest', 'ncy-angular-breadcrumb', 'ngMaterial', 'ngResource', 'ngMessages',
        'ngMdIcons', 'md.data.table','highcharts-ng'])

    .config(function ($stateProvider, $urlRouterProvider, $mdIconProvider, $resourceProvider,
                      $httpProvider, $breadcrumbProvider) {

        // For any unmatched url, redirect to /movies
        $urlRouterProvider.otherwise("/landing");

        $stateProvider
            .state('root', {

                abstract: true,
                templateUrl: "views/root/root.html"
            });

        $mdIconProvider
            .iconSet('content', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg')
            .iconSet('action', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg')
            .iconSet('editor', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg')
            .iconSet('navigation', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg');


        //this overrides the defaults actions for all $resources
        angular.extend($resourceProvider.defaults.actions, {

            update: {
                method: "PUT"
            }

        });

        $httpProvider.interceptors.push('reqErrInterceptor');
        //auth interceptor
        $httpProvider.interceptors.push('authInterceptor');

        $breadcrumbProvider.setOptions({
            templateUrl: "components/breadcrumbs/breadcrumbs.html",
        });

    });
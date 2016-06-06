/**
 * Created by Akash on 5/31/2016.
 */
'use strict';

angular.module('myApp.pattern')

    .constant('patternState', {
        name: 'pattern.detail',
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
                    templateUrl: 'views/pattern/pattern.html',
                    controller: 'PatternListCtrl'
                }
                /*,'outside@root': {
                 templateUrl: 'views/list/movie-list-buttons.html',
                 controller: 'movieListButtonCtrl'
                 }*/
            },

            ncyBreadcrumb: {
                label: "Identify the Pattern"
            }

        }
    })
    .controller('PatternListCtrl', function ($scope, Pattern, Question, $location, currUser) {


        $scope.authed = false;

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            $scope.authed = loggedIn;
            if(!$scope.authed){
                $location.path('/landing');
            }
        });

        $scope.nextIndex = 0;
        $scope.selectedOptions = []
        $scope.selectedOption = "";

        var questionsPromise = Question.query(function () {
            var questionDetails = [];
            for (var ctr = 0; ctr < questionsPromise.length; ctr++) {
                questionDetails.push(questionsPromise[ctr]);
            }

            $scope.questions = questionDetails;
            $scope.no_of_questions = $scope.questions.length;
            $scope.currentQuestion = $scope.questions[0];
            console.log($scope.currentQuestion);

            $scope.nextQuestion = function (selectedOption) {
                console.log("Next Question Called");
                if (!$scope.isOptionPresent(selectedOption)) {
                    $scope.selectedOptions.push(selectedOption);
                }

                if ($scope.questionSelectedIndex == $scope.no_of_questions - 1) {
                    $scope.currentQuestion = null;
                    $scope.nextTab($scope.selectedIndex);
                }
                else {
                    var questionIndex = $scope.questionSelectedIndex + 1;
                    $scope.questionSelectedIndex = questionIndex;
                    $scope.currentQuestion = $scope.questions[$scope.questionSelectedIndex];
                    console.log($scope.currentQuestion);
                    console.log($scope.questionSelectedIndex);
                }
            };
        });
        $scope.isOptionPresent = function (selectedOption) {
            var index = $scope.selectedOptions.indexOf(selectedOption);
            var isPresent = false;
            if (index > -1) {
                isPresent = true;
            }
            return isPresent;
        };
        $scope.tabs = [
            {index: 0, title: 'Phase1'},
            {index: 1, title: 'Phase2'}
        ];
        $scope.showProceedButton = false;
        $scope.currentQuestion = null;

        $scope.disableValue = [];
        for (var i = 0; i < $scope.tabs.length; i++) {
            $scope.disableValue[i] = true;
        }
        $scope.max = $scope.tabs.length;
        $scope.selectedIndex = 0;

        $scope.submitUseCase = function () {
            if ($scope.useCaseDesc && $scope.useCaseName) {
                $scope.disableValue[0] = true;
                $scope.nextTab(0);
                $scope.questionSelectedIndex = 0;
                $scope.currentQuestion = $scope.questions[0];
            }
        };

        $scope.nextTab = function (changeToIndex) {

            console.log("Next Tab Called");
            if ($scope.selectedIndex >= $scope.max) {
                console.log($scope.selectedOptions);
                $location.path("/result");
            }
            $scope.disableValue[changeToIndex] = false;
            var index = ($scope.selectedIndex == $scope.max + 1) ? $scope.max + 1 : $scope.selectedIndex + 1;
            $scope.selectedIndex = index;
        };


        $scope.patterns = Pattern.query();
        $scope.$on('patternId', function (ev, pattern) {
            $scope.patterns.push(pattern);
        });

    })
;

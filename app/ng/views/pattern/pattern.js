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


        },
        Phases: {
            CurrentPhase: "Pattern",
            PrevPhase: "",
            PhaseNumber: 1,
            PhaseValue: 0,
            PhaseName: "Determine Pattern"

        }
    })
    .controller('PatternListCtrl', function ($rootScope, $scope, $q, patternState, QuestionsByPatternType,
                                             $location, currUser, BASEURL, $http) {
        $rootScope.patternResults = [];
        $scope.authed = false;
        $scope.showProceedButton = false;
        $scope.showResults = false;
        $scope.prevPhaseResults = [];
        $scope.selectedIndex = 0;
        $scope.phaseNumber = patternState.Phases.PhaseNumber;
        $scope.phaseProgress = patternState.Phases.PhaseValue;
        $scope.phasePatternType = patternState.Phases.CurrentPhase;
        $scope.tabs = [];
        $scope.tabs.push({
            index: patternState.Phases.PhaseNumber,
            title: patternState.Phases.PhaseName
        });
        $scope.maxTabs = $scope.tabs.length;
        $scope.nextIndex = 0;
        $scope.selectedOptions = [];
        $scope.selectedOption = "";

        $scope.$watch(function () {
            return currUser.loggedIn();
        }, function (loggedIn) {
            $scope.authed = loggedIn;
            if (!$scope.authed) {
                $location.path('/landing');
            }
        });

        $q.all($scope.questions);

        $scope.submitUseCase = function () {
            if ($scope.useCaseDesc && $scope.useCaseName) {
                $scope.phaseProgress += 20;
                $scope.getNextQuestions($scope.phasePatternType);
                $scope.nextTab();
            }
        };

        $scope.getNextQuestions = function (patternType) {
            var questionPromise = QuestionsByPatternType.query(patternType).$promise;

            questionPromise.then(function (data) {
                if (data.length != 0) {
                    $scope.questions = data;
                    $scope.noOfQuestions = data.length;
                    $scope.questionSelectedIndex = 0;
                    $scope.currentQuestion = $scope.questions[$scope.questionSelectedIndex];
                } else {
                    $scope.showResults = true;
                    $scope.getResults();
                }
            });
            return $scope.showResults;
        };


        /*
         Check if Particular Option exists in the List of Selected Options
         if Present : do not add again
         if not Add to the List
         */
        $scope.isOptionPresent = function (selectedOption) {
            var index = $scope.selectedOptions.indexOf(selectedOption);
            var isPresent = false;
            if (index > -1) {
                isPresent = true;
            }
            return isPresent;
        };

        $scope.isPositiveOption = function (option) {
            return !(option.includes("!") || option === null);
        };


        $scope.nextTab = function () {
            if ($scope.showResults == true) {
                $scope.getResults();
            }
            else {
                $scope.selectedIndex = ($scope.selectedIndex == $scope.max + 1) ? $scope.max + 1 : $scope.selectedIndex + 1;
            }
        };


        $scope.nextPhase = function () {
            $scope.questions = [];
            patternState.Phases.PrevPhase = $scope.phasePatternType;
            $scope.prevPhaseResults = $scope.selectedOptions.filter($scope.isPositiveOption);
            $scope.prevPhaseResults.forEach(function (selectedOption) {
                $scope.getNextQuestions(selectedOption);
            });
            $scope.isShowResultsTrue = $scope.getNextQuestions($scope.phasePatternType);
            console.log($scope.isShowResultsTrue);
            if ($scope.isShowResultsTrue) {
                $scope.getResults();
            }
            else {
                $scope.phasePatternType = $scope.selectedOptions.shift().toString();
                patternState.Phases.CurrentPhase = $scope.phasePatternType;
                $scope.selectedOptions = [];
                $scope.phaseNumber += 1;
                $scope.phaseProgress += 20;
                $scope.maxTabs += $scope.tabs.push({
                    index: $scope.phaseNumber,
                    title: "Determine " + $scope.phasePatternType
                });
                $scope.nextTab();
            }
        };

        $scope.getResults = function () {
            $rootScope.patternResults = $scope.prevPhaseResults;
            var user = currUser.getUser();
            var analysisResult = $rootScope.patternResults[0];
            var userStoryName = $scope.useCaseName;
            var userStoryDesc = $scope.useCaseDesc;
            postFeedback(user.username, userStoryDesc, userStoryName, analysisResult);
            console.log($rootScope.patternResults);
            $location.path("/result");
        };

        $scope.nextQuestion = function (selectedOption) {
            /*
             Check if option present, else push to Selected Options Stack
             */
            if (!$scope.isOptionPresent(selectedOption)) {
                $scope.selectedOptions.push(selectedOption);
            }
            /*
             Check for end of list of questions
             */
            if ($scope.questionSelectedIndex == $scope.noOfQuestions - 1) {
                if (!(patternState.Phases.CurrentPhase === "Pattern" ||
                    patternState.Phases.CurrentPhase === "Design" ||
                    patternState.Phases.CurrentPhase === "Creational" ||
                    patternState.Phases.CurrentPhase === "Structural" ||
                    patternState.Phases.CurrentPhase === "Behavioral")) {
                    $scope.getResults();
                } else {
                    $scope.nextPhase();
                }
            }
            /*
             Check if more questions exists
             * */
            else if ($scope.questionSelectedIndex < $scope.noOfQuestions - 1) {
                $scope.questionSelectedIndex += 1;
                $scope.currentQuestion = $scope.questions[$scope.questionSelectedIndex];
            }
        };

        function postFeedback(user, userStoryDesc, userStoryName, analysisResult) {
            return $http.post(BASEURL + '/api/history', {
                username: user,
                userStoryDesc: userStoryDesc,
                userStoryName: userStoryName,
                analysisResult: analysisResult,
                analysisDate: new Date()
            }).success;
        }
    })
;

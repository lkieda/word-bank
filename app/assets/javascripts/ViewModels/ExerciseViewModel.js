﻿function ExerciseViewModel() {
    var self = this;

    // Private variables
    var _isRechecking = ko.observable(false);
    var _firstAttemptFailed = false;
    var _states = {
        loadingData: 1,
        exercise: 2,
        summary: 3
    };
    var _currentState = ko.observable(_states.loadingData);

    // Public properties
    self.answeredQuestions = ko.observableArray();
    self.currentQuestion = ko.observable({praesens: "", praeteritum: "", partizip: "", attempts: "0"});
    self.partizipAnswer = ko.observable();
    self.pendingQuestions = [];
    self.praeteritumAnswer = ko.observable();
    self.submitAttributes = ko.observable({});

    // Methods
    self.getNextQuestion = function () {
        var nextQuestion = self.pendingQuestions.shift();
        nextQuestion.attempts++;
        return nextQuestion;
    };

    self.validateAnswer = function (given, correct) {
        if (_isRechecking() === false) return "";

        if (given != correct) {
            _firstAttemptFailed = true;
            return correct;
        } else {
            return "";
        }
    }

    self.praesensAnswer = ko.computed(function () {
        return (self.currentQuestion() == null) ? "" : self.currentQuestion().praesens;
    }, this);

    self.praesensFeedback = ko.computed(function () {
        return self.validateAnswer(self.praesensAnswer(), self.currentQuestion().praesens);
    }, this);

    self.praeteritumFeedback = ko.computed(function () {
        return self.validateAnswer(self.praeteritumAnswer(), self.currentQuestion().praeteritum);
    }, this);

    self.partizipFeedback = ko.computed(function () {
        return self.validateAnswer(self.partizipAnswer(), self.currentQuestion().partizip);
    }, this);

    self.isExerciseFormVisible = ko.computed(function () {
        return _currentState() == _states.exercise;
    }, this);

    self.isSummaryTableVisible = ko.computed(function () {
        return _currentState() == _states.summary;
    }, this);

    self.isLoadingData = ko.computed(function () {
        return _currentState() == _states.loadingData;
    }, this);

    self.scoreString = ko.computed(function () {
        var successes = self.answeredQuestions().length;
        var failures = 0;
        for (var i = 0; i < self.answeredQuestions().length; i++) {
            failures += self.answeredQuestions()[i].attempts;
        }
        var percentage = Math.round((successes / failures) * 100);
        return successes + "/" + failures + " (" + percentage + "%)";
    }, this);

    self.submitAnswer = function () {
        _isRechecking(true);

        if (self.partizipFeedback() + self.praesensFeedback() + self.praeteritumFeedback() == "") {
            _acceptAnswer();
        }
    };

    var _acceptAnswer = function () {
        _isRechecking(false);
        if (_firstAttemptFailed) {
            self.pendingQuestions.push(self.currentQuestion());
        } else {
            self.answeredQuestions.push(self.currentQuestion());
        }

        _firstAttemptFailed = false;
        self.praeteritumAnswer("");
        self.partizipAnswer("");

        if (self.pendingQuestions.length > 0) {
            self.currentQuestion(self.getNextQuestion());
        } else {
            _currentState(_states.summary);
        }
    };

    self.loadNewQuestions = function(){
        _currentState(_states.loadingData);
        self.currentQuestion({praesens: "", praeteritum: "", partizip: "", attempts: "0"});
        self.praeteritumAnswer("");
        self.partizipAnswer("");
        self.submitAttributes({});
        self.pendingQuestions = [];
        self.answeredQuestions([]);

        $.post('exercise/questions', function (data) {
            self.pendingQuestions = data;
            _currentState(_states.exercise);
            self.currentQuestion(self.getNextQuestion());
        });
    };

    self.loadNewQuestions();
};
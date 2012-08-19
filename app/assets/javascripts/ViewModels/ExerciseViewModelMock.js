function ExerciseViewModelMock() {
    var self = this;

    // Public properties
    self.answeredQuestions = ko.observableArray([
        { praesens: "gehen", praeteritum: "ging", partizip: "gegangen", attempts: "1" },
        { praesens: "haben", praeteritum: "hatte", partizip: "gehabt", attempts: "1" },
        { praesens: "fahren", praeteritum: "fuhr", partizip: "gefahren", attempts: "2" },
        { praesens: "sterben", praeteritum: "starb", partizip: "gestorben", attempts: "3" },
        { praesens: "springen", praeteritum: "sprang", partizip: "gesprungen", attempts: "3" }
    ]);
    self.currentQuestion = ko.observable({
        praesens: "",
        praeteritum: "",
        partizip: "",
        attempts: "0"
    });
    self.generalFeedback = ko.observable({
        message: "",
        type : ""
    });
    self.partizipAnswer = ko.observable();
    self.pendingQuestions = [];
    self.praeteritumAnswer = ko.observable();
    self.submitAttributes = ko.observable({});

    // Methods
    self.praesensAnswer = ko.computed(function () {
        return "";
    }, this);

    self.praesensFeedback = ko.computed(function () {
        return "";
    }, this);

    self.praeteritumFeedback = ko.computed(function () {
        return "";
    }, this);

    self.partizipFeedback = ko.computed(function () {
        return "";
    }, this);

    self.isSubmitEnabled = ko.computed(function() {
        return false;
    }, this);

    self.isExerciseFormVisible = ko.computed(function () {
        return false;
    }, this);

    self.isSummaryTableVisible = ko.computed(function () {
        return true;
    }, this);

    self.isLoadingData = ko.computed(function () {
        return false;
    }, this);

    self.scoreString = ko.computed(function () {
        return "5/10 (50%)";
    }, this);

    self.submitAnswer = function() {};
    self.loadNewQuestions = function() {};
};
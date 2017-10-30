(function() {
  'use strict';

  angular
    .module('guan')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $http) {
    var vm = this;

    vm.awesomeThings = [];
    vm.chosenCategoryID = '';
    vm.classAnimation = '';
    vm.creationDate = 1509312974169;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }

    var keyQuestionCounter = "questionCounter";
    // localStorage.setItem(keyQuestionCounter, 0);

    vm.question = '';
    vm.answers  = '';
    vm.correct  = '';
    vm.askQuestion = false;
    vm.selectCategory = true;
    vm.correctAnswer = false;
    vm.wrongAnswer = false;


    vm.chooseCategory = (function cC(catID) {
      console.log('chosen category: ' + catID);
      vm.chosenCategoryID = catID;
      //todo load question
      vm.selectCategory = false;
      loadQuestion();
    });

// loadQuestion();

    function loadQuestion() {
      vm.askQuestion = true;
      // Simple GET request example:
      $http({
        method: 'GET',
        url: 'app/main/'+vm.chosenCategoryID+'_samplequestion.json'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response.data['question']);
          vm.question = response.data['question'];
          vm.answers  = response.data['answers'];
          vm.correct  = response.data['correct'];
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(response);
        });


      // $.getJSON("app/main/1_samplequestion.json", function(json) {
      //     console.log(json); // this will show the info it in firebug console
      //     vm.question = json['question'];
      //     vm.answers  = json['answers'];
      //     vm.correct  = json['correct'];
      // });
    }

    vm.reset = (function reset() {
      console.log('reset');
       vm.askQuestion = false;
       vm.selectCategory = true;
       vm.correctAnswer = false;
       vm.wrongAnswer = false;
       vm.chosenCategoryID = 'None';
       vm.selectedAnswer = 'None';
       vm.selectCategory = true;
    });


    vm.validate = (function validate(id) {
      vm.selectedAnswer = id;
      if (vm.correct == id) {
        console.log('correct');
        vm.correctAnswer = true;
        vm.wrongAnswer = false;
        vm.askQuestion = false;
      }
      else {
        console.log('wrong!');
        vm.correctAnswer = false;
        vm.wrongAnswer = true;
        vm.askQuestion = false;
      }

      // TODO question Counter
      var questionCount= localStorage.getItem(keyQuestionCounter);
      questionCount++;
      console.log(questionCount);
      localStorage.removeItem(keyQuestionCounter);
      localStorage.setItem(keyQuestionCounter, questionCount);
    });

    /* New */
    vm.categories = [
      {
        'id': 0,
        'name': 'Actors & Movies'
      },
      {
        'id': 1,
        'name': 'Geography'
      }
    ];

  }
})();

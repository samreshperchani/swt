(function() {
  'use strict';

  angular
    .module('guan')
    .controller('StatsController', StatsController);

  /** @ngInject */
  function StatsController($timeout, webDevTec, toastr, $http) {
    var vm = this;
    var keyQuestionCounter = "questionCounter";
    vm.answeredQuestions = localStorage.getItem(keyQuestionCounter);

  }
})();

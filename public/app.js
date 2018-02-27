/***
 * Excerpted from "Serverless Single Page Apps",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/brapps for more book information.
***/
"use strict";

var learnjs = {};

// data structure
learnjs.problems = [
  {
    description: "What is truth?",
    code: "function problem() { return __; }"
  },
  {
    description: "Simple Math",
    code: "function problem() { return 42 === 6 * __; }"
  }
];

// trigger event global
learnjs.triggerEvent = function(name, args) {
  $('.view-container>*').trigger(name, args);
};

// clone the template
learnjs.template = function(name) {
  return $('.templates .' + name).clone();
};

// fill value through data-name
learnjs.applyObject = function(obj, elem) {
  for (var key in obj) {
    elem.find('[data-name="' + key + '"]').text(obj[key]);
  }
};

// animation for element show
learnjs.flashElement = function(elem, content) {
  elem.fadeOut('fast', function() {
    elem.html(content);
    elem.fadeIn();
  });
};

// correct flash
learnjs.buildCorrectFlash = function (problemNum) {
  var correctFlash = learnjs.template('correct-flash'); // clone template
  var link = correctFlash.find('a'); // link the next page
  if (problemNum < learnjs.problems.length) {
    link.attr('href', '#problem-' + (problemNum + 1)); // change the hash
  } else {
    link.attr('href', '');
    link.text("You're Finished!");
  }
  return correctFlash;
};

// problem view handle
learnjs.problemView = function(data) {
  var problemNumber = parseInt(data, 10); // number
  var view = learnjs.template('problem-view'); // clone
  var problemData = learnjs.problems[problemNumber - 1]; // call the specific data structure
  var resultFlash = view.find('.result');

  // check the answer
  function checkAnswer() {
    var answer = view.find('.answer').val();
    var test = problemData.code.replace('__', answer) + '; problem();';
    return eval(test); // directly eval the code
  }

  function checkAnswerClick() {
    if (checkAnswer()) { // show the tip
      var flashContent = learnjs.buildCorrectFlash(problemNumber);
      learnjs.flashElement(resultFlash, flashContent);
    } else {
      learnjs.flashElement(resultFlash, 'Incorrect!');
    }
    return false;
  }

  if (problemNumber < learnjs.problems.length) {
    var buttonItem = learnjs.template('skip-btn');
    buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
    $('.nav-list').append(buttonItem);
    view.bind('removingView', function() {
      buttonItem.remove();
    });
  }

  view.find('.check-btn').click(checkAnswerClick);
  view.find('.title').text('Problem #' + problemNumber);
  learnjs.applyObject(problemData, view);
  return view;
};

learnjs.landingView = function() {
  return learnjs.template('landing-view');
};

learnjs.showView = function(hash) {
  var routes = {
    '#problem': learnjs.problemView,
    '#': learnjs.landingView,
    '': learnjs.landingView
  };
  var hashParts = hash.split('-');
  var viewFn = routes[hashParts[0]];
  if (viewFn) {
    learnjs.triggerEvent('removingView', []);
    $('.view-container').empty().append(viewFn(hashParts[1]));
  }
};

// prepare for reade
learnjs.appOnReady = function() {
  window.onhashchange = function() { // invoke the show view when change
    learnjs.showView(window.location.hash);
  };
  learnjs.showView(window.location.hash); // invoke the handle function when start
};

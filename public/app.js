"use strict";
var learnjs = {};
learnjs.problemView = function(data){
    var problemNumber = parseInt(data, 10);
    var view = $('.templates .problem-view').clone();
    var probemData = learnjs.problems[problemNumber - 1];
    var resultFlash = view.find('.result');

    function checkAnswer() {
        var answer = view.find('.answer').val();
        var test = problemData.code.replace('__', answer) + ';problem();';
        return eval(test);
    }
        
    function checkAnswerClick(){
        if (checkAnswer()){
            var correctFlash = learnjs.template('correct-flash');
            correctFlash.find('a').attr('href','#problem-' + (problemNumber + 1));
            learnjs.flashElement(resultFlash, correctFlash);
        }
    }

    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text('Problem #' + problemNumber);
    learnjs.applyObject(problemData, view);
    return view;

    /*var title = 'Problem #' + problemNumber + ' Coming Soon!';
    return $('<div class="problem-view">').text(title);*/
};
learnjs.landingView = function(){
    return learnjs.template('landing-view');
};
learnjs.flashElement = function(elem, content){
    elem.fadeOut('fast', function(){
        elem.html(content);
        elem.fadeIn();
    })
}

learnjs.applyObject = function(obj, elm){
    for (var key in obj) {
        elem.find('[data-name="' + key + '"]').text(obj[key])
    }
};
learnjs.template = function(){
    return $('.templates .' + name).clone();
};
learnjs.showView = function(hash){
    console.log("hash : ", hash);

    var routes = {
        '#problem' : learnjs.problemView,
        '': learnjs.landingView()
    };
    var hashParts = hash.split('-');

    var viewFn = routes[hashParts[0]];
    if(viewFn){
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
};
learnjs.appOnReady = function () {         
    window.onhashchange = function(){
        learnjs.showView(window.location.hash);
    };
    learnjs.showView(window.location.hash);
};
learnjs.buildCorrectFlash = function(problemNum){
    var correctFlash = learnjs.template('correct-flash');
    var link = correctFlash.find('a');
    if(problemNum < learnjs.problems.length){
        link.attr('href', '#problem-' + (problemNum + 1));
    } else {                                          
        link.attr('href', '');
        link.text("You're Finished!");
    }
    return correctFlash;
};
learnjs.triggerEvent = function(name, args) {
    $('.view-container>*').trigger(name, args);
};

learnjs.triggerEvent('removingView', []);
$('.view-container').empty().append(viewFn(hasParts[1]));
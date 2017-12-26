"use strict";
var learnjs = {};
learnjs.problemView = function(){
    return $('<div class="problem-view">').text('Coming soon!');
};
learnjs.showView = function(hash){
    console.log("hash : ", hash);
    var routes = {
        '#problem-1' : learnjs.problemView
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
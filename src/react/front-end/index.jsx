var React = require('react');
var ReactDom = require('react-dom');
var Main = require('./containers/MainContainer');
var topInterests = require("./d3-graphs/d3-TopInterests");
var loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.indexOf(document.readyState) > -1 && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}


function run() {

 
     
     ReactDom.render((
     <Main />
     ), document.querySelector('#pageContainer'));
     

}


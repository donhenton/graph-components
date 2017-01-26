var React = require('react');
var ReactDom = require('react-dom');
var Main = require('./containers/MainContainer');
 

var loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.indexOf(document.readyState) > -1 && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}

function run() {
     
    //use this to pass initial properties
    //pathRequested is global
    
    var propObj = {};
    
    ReactDom.render((
         <Main />
    ), document.querySelector('#pageContainer'));
}

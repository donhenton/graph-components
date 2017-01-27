//var React = require('react');
//var ReactDom = require('react-dom');
////var Main = require('./containers/MainContainer');
var topInterests = require("./d3-graphs/d3-TopInterests");
var loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.indexOf(document.readyState) > -1 && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}

function run() {

//use this to pass initial properties
//pathRequested is global
    /*
     var propObj = {};
     
     ReactDom.render((
     <Main />
     ), document.querySelector('#pageContainer'));
     
     */
//use for graph right now
    var data1 = [
        {key: "Food Brands", value: 2},
        {key: "Award Shows", value: .8},
        {key: "Motherhood", value: 1.05}];
    
       
    
    
    var margin = {
        top: 20,
        bottom: 70,
        left: 30,
        right: 30
    };
    var params1 = {

        margin: margin,
        boxHeight: 450,
        data: data1,
        boxWidth: 800,
        graphSelector: "#graphLocation"
    }
 
    


    topInterests.init(params1);
}


$('#updateTest').on("click" ,
function()
{
       var data2 = [
        {key: "Manny", value: 5},
        {key: "Moe", value: 3},
        {key: "Motherhood", value: .7}];
    
    topInterests.update(data2)
    
});
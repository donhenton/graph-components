//var React = require('react');
//var ReactDom = require('react-dom');
////var Main = require('./containers/MainContainer');
var topInterests = require("./d3-graphs/d3-TopInterests");
        var loadedStates = ['complete', 'loaded', 'interactive'];
        if (loadedStates.indexOf(document.readyState) > - 1 && document.body) {
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
var data = [
{key: "Food Brands", value: 2},
{key: "Award Shows", value: .8},
{key: "Motherhood", value: 1.05}];
        var margin = {
                top: 20,
                bottom: 70,
                left: 30,
                right: 30
                };
        var params = {

         margin: margin,
                boxHeight:450,
                data: data,
                boxWidth: 800,
                graphSelector: "#graphLocation"
        }


 
        var w = 800;
        var h = 450;
        topInterests.init(params);
        }

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
        top: 50,
                bottom: 100,
                left: 80,
                right: 40
                };
        var params = {

         margin: margin,
                h:450,
                data: data,
                w: 800,
                graphSelector: "#graphLocation"
        }


 
        var w = 800;
        var h = 450;
        topInterests.init(params);
        }

var paramSettings =
        {
            'axisColor': '#00000'
        }



var data = [
    {key: "Food Brands", value: 2},
    {key: "Award Shows", value: .8},
    {key: "Motherhood", value: 1.05}
];
var w = 800;
var h = 450;
var margin = {
    top: 50,
    bottom: 100,
    left: 80,
    right: 40
};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var params =
        {
            data: data,
            height: height,
            width: width,
            baseline: 1


        };
function getColorForBar(i)
{
    // var ordinalColorScale = d3.scale.category20();
    return '#ddd'

}
/* global d3 */
function init()
{

    var svg = d3.select('#graphLocation').append("svg")
            .attr("id", "chart")
            .attr("width", w)
            .attr("height", h);
    var chart = svg.append("g")
            .classed("display", true)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");






    plot.call(chart, params, true);
}

function drawAxis(params, x, y, initialize)
{
    var xAxis = d3.axisBottom().tickSize(0)
            .scale(x);
    var yAxis = d3.axisLeft().tickSize(0)
            .scale(y);
            

    if (initialize)
    {


        //labels for the x axis        
        this.append("g")
                .classed("x axis", true)
                .attr("transform", "translate(" + 0 + "," + params.height + ")")
                .call(xAxis)
                .selectAll("text")
                .classed('x-axis-label', true)
                .style("text-anchor", "center")
                //.attr("dx", -8)
                .attr("dy", 20)


        this.append("g")
                .classed("y axis", true)
                .attr("transform", "translate(0,0)")
                .call(yAxis);


        this.selectAll("g.y.axis text").attr("visibility", "hidden");


    }//initial
    else
    {
        this.selectAll("g.x.axis")
                .transition()
                .duration(500).ease("bounce")
                .call(xAxis);
        this.selectAll(".x-axis-label")
                .style("text-anchor", "end")
                .attr("dx", -8)
                .attr("dy", 8)


        this.selectAll("g.y.axis")
                .transition()
                .duration(500).ease("bounce")
                .call(y);

        //update
    }//end update


}


function createToolTipTriangle(container,boxSize)
{
    var w = 25;
    var lineData = [{x: 0, y: w / 2}, {x: w, y: 0}, {x: w, y: w}];
    var lineFunction = d3.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            


    container.append("path")
            .attr("d", lineFunction(lineData))
            .attr("stroke-width", 2)
            .attr("fill", "red");


}


function createToolTip(rect, data, index)
{

    console.log(rect.attr("width"))
    var xPosition = parseFloat(rect.attr("x")) + parseFloat(rect.attr("width"));
    var yPosition = params.height - parseFloat(rect.attr("height") / 2);

    //var xPosition = d3.mouse(rect[0][0])[0];
    //var yPosition =   d3.mouse(rect[0][0])[1];
    var display = d3.select('.display');
    var toolGroup = display.append("g");
    var toolTipSize = 40;
    toolGroup
            .attr("transform", "translate(" + xPosition + "," + yPosition + ")")
            .attr("id", "tooltip")
    toolGroup.append("rect")
            .attr("width", toolTipSize + "")
            .attr("height", toolTipSize + "")
            .attr("fill", "black");


    createToolTipTriangle(toolGroup,toolTipSize)        





    toolGroup.append("text")

            .attr("text-anchor", "center")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("font-weight", "bold")
            .attr("transform", "translate(5," + toolTipSize / 2 + ")")
            .attr("fill", "white")
            .text(data.value);



}
//http://denvycom.com/blog/d3-js-version-4-x-examples-and-changes-from-version-3-x/
//https://github.com/d3/d3/blob/master/CHANGES.md

function plot(params, initialize) {



    var x = d3.scaleBand()
            .domain(params.data.map(function (entry) {
                return entry.key;
            }))
            .range([0, params.width]);
    var y = d3.scaleLinear()
            .domain([0, d3.max(params.data, function (d) {
                    return d.value;
                })])
            .range([params.height, 0]);

    drawAxis.call(this, params, x, y, initialize);



    //enter
    this.selectAll(".bar")
            .data(params.data)
            .enter()
            .append("rect")
            .classed("bar", true)
            .on("mouseover", function (d, i) {
                //var mousePtX = d3.mouse(this)[0];
                //var mousePtY = d3.mouse(this)[1];
                var thisRect = d3.select(this);
                createToolTip(thisRect, d, i);

            })
            .on("mousemove", function (d, i) {
                /*
                 var thisRect = d3.select(this)
                 var xPosition = parseFloat(thisRect.attr("x"));
                 var yPosition = params.height - parseFloat(thisRect.attr("height"));
                 var mousePtX = d3.mouse(this)[0];
                 var mousePtY = d3.mouse(this)[1];
                 console.log("x "+(mousePtX-xPosition)+","+(mousePtY-yPosition))
                 d3.select("#tooltip")
                 .attr("transform", "translate("+(mousePtX-xPosition)+","+(mousePtY-yPosition)+")")
                 //Create the tooltip label
                 */

            })
            .on("mouseout", function (d, i) {

                d3.select("#tooltip").remove();
            })
    var baseLineGroup = this.append('g');

    //the base line
    baseLineGroup.append("line")
            .classed("baseline-line", true)
            .style("stroke", "black")
            .style("stroke-dasharray", "4,2")
            .attr("x1", 0)
            .attr("y1", y(params.baseline))
            .attr("x2", params.width)
            .attr("y2", y(params.baseline));

    baseLineGroup.append("text")
            .classed("baseline-label", true)
            // .attr("text-anchor", "right")
            .attr('font-weight', 'bolder')
            //.attr('font-size','20px')
            .attr("transform", "translate(" + (params.width * .9) + "," + (y(params.baseline) - 7) + ")")
            .text("Baseline 1.0");


    //update
    this.selectAll(".bar")

            .attr("x", function (d, i) {
                //this determines the displacement of the bars
                return  x(d.key) + x.bandwidth() * .125;

            })
            .attr("y", function (d, i) {
                return  y(d.value) - 1;
            })
            .attr("height", function (d, i) {
                return params.height - y(d.value);
            })
            .attr("width", function (d) {
                //this determines the width (1-.75)/2 use for x above
                return  x.bandwidth() * .75;
            })
            .style("fill", function (d, i) {
                return getColorForBar(i);
            });

    var t = d3.transition().duration(500).ease(d3.easeBounce);       
    this.selectAll(".bar-label")
          //  .transition().duration(500).ease("bounce")
            .attr("x", function (d, i) {
                return  x(d.key) + (x.bandwidth() / 2);
            })
            .attr("dx", 0)
            .attr("y", function (d, i) {
                return  y(d.value);
            })
            .attr("dy", -6)
            .text(function (d) {
                return d.value;
            });

    //exit()
    this.selectAll(".bar")
            .data(params.data)
            .exit()
            .remove();

    this.selectAll(".bar-label")
            .data(params.data)
            .exit()
            .remove();




}



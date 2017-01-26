var data = [
    {key: "Food Brands", value: 132},
    {key: "Award Shows", value: 71},
    {key: "Motherhood", value: 88} 
];
var w = 800;
var h = 450;
var margin = {
    top: 58,
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
            width: width


        };


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


    var controls = d3.select("body")
            .append("div")
            .classed('controls', true);

    var sort_btn = controls.append("button")
            .html("Sort data: ascending")
            .attr("state", 0);

    sort_btn.on("click", function () {
        var self = d3.select(this);
        var ascending = function (a, b) {
            return a.value - b.value;
        };
        var descending = function (a, b) {
            return b.value - a.value;
        }

        var state = +self.attr("state");
        var txt = "Sort data: ";
        if (state === 0) {
            data.sort(ascending);
            state = 1;
            txt += "descending";
        } else if (state === 1) {
            data.sort(descending);
            state = 0;
            txt += "ascending";
        }
        self.attr("state", state);
        self.html(txt);

        plot.call(chart, params, false);

    });

    sort_btn.classed("button", true);


    plot.call(chart, params, true);
}

function drawAxis(params, x, y, initialize)
{
    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    if (initialize)
    {

        var yGridlines = d3.svg.axis()
                .scale(y)
                .tickSize(-params.width, 0, 0)
                .tickFormat("")
                .orient("left");

        this.append("g")
                .call(yGridlines)
                .classed("gridline", true)
                .attr("transform", "translate(0,0)");

        this.append("g")
                .classed("x axis", true)
                .attr("transform", "translate(" + 0 + "," + params.height + ")")
                .call(xAxis)
                .selectAll("text")
                .classed('x-axis-label', true)
                .style("text-anchor", "end")
                .attr("dx", -8)
                .attr("dy", 8)
                .attr("transform", "translate(0,0) rotate(-45)");

        this.append("g")
                .classed("y axis", true)
                .attr("transform", "translate(0,0)")
                .call(yAxis);

        this.select(".y.axis")
                .append("text")
                .attr("x", 0)
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(-50," + params.height / 2 + ") rotate(-90)")
                .text("Units sold");

        this.select(".x.axis")
                .append("text")
                .attr("x", 0)
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + params.width / 2 + ",80)")
                .text("Donut type");

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
                .attr("transform", "translate(0,0) rotate(-45)");

        this.selectAll("g.y.axis")
                .transition()
                .duration(500).ease("bounce")
                .call(y);

        //update
    }//end update





}

function plot(params, initialize) {

    var ordinalColorScale = d3.scale.category20();

    var x = d3.scale.ordinal()
            .domain(params.data.map(function (entry) {
                return entry.key;
            }))
            .rangeBands([0, params.width]);
    var y = d3.scale.linear()
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
                d3.select(this).style("fill","yellow");
            })
            .on("mousemove", function (d, i) {
                
            })
            .on("mouseout", function (d, i) {
                d3.select(this).style("fill",ordinalColorScale(i));
            })
    this.selectAll(".bar-label")
            .data(params.data)
            .enter()
            .append("text")
            .classed("bar-label", true);

    //update
    this.selectAll(".bar")
            .transition().duration(500).ease("bounce")
            .attr("x", function (d, i) {
                return  x(d.key);
            })
            .attr("y", function (d, i) {
                return  y(d.value);
            })
            .attr("height", function (d, i) {
                return params.height - y(d.value);
            })
            .attr("width", function (d) {
                return  x.rangeBand();
            })
            .style("fill", function (d, i) {
                return ordinalColorScale(i);
            });


    this.selectAll(".bar-label")
            .transition().duration(500).ease("bounce")
            .attr("x", function (d, i) {
                return  x(d.key) + (x.rangeBand() / 2);
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



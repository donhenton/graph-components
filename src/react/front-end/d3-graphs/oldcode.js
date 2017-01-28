/* global d3 */

module.exports = {

    /**
     * initiaLization method
     * 
     * initParams
     * 
     *      margin: { top: 20,bottom: 70,left: 30,right: 30}, //margins within box
            boxHeight: 450, //height overall
            data: dataSample, see below
            boxWidth: 800, //width overall
            graphSelectorId: eg "graphLocation" the id assigned to the d3 graph
     * 
     * 
     * var dataSample = [
                {key: "Manny", value: 1.2},
                {key: "Moe", value: .87},
                {key: "Motherhood", value: .7}];
    
        the keys must be unique for updates to function properly
    
     * 
     * 
     * 
     * 
     */
    init: function (initParams)
    {
        var svg = null;
        var chart = null;
        var margin = null;
        var xAxis = null;
        var yAxis = null;
        var xScale = null;
        var yScale = null;
        var graphWidth = 0;
        var graphHeight = 0;
        var boxHeight = 0;
        var baseLine = 1;
        var boxWidth = 0;
        var data = null;
        var tip = d3.tip().attr('class', 'd3-tip').html(function (d) {
            return d.value;
        });

        var graphSelectorId = null;
        tip.direction('e');
        margin = initParams.margin;
        boxHeight = initParams.boxHeight;
        data = initParams.data;
        boxWidth = initParams.boxWidth;
        graphSelectorId = initParams.graphSelectorId;
        svg = d3.select("#"+graphSelectorId).append("svg")
                .attr("id", "chart")
                .attr("width", boxWidth)
                .attr("height", boxHeight);
        chart = svg.append("g")
                .classed("display", true)
                .attr("transform", "translate(" + margin.left + "," + margin.top * 2 + ")");


        svg.call(tip);
        graphWidth = boxWidth - margin.left - margin.right;
        graphHeight = boxHeight - margin.top - margin.bottom;

        var params =
                {
                    data: data,
                    height: graphHeight,
                    width: graphWidth


                };

        function  getColorForBar(i)
        {

            return '#ddd'

        }

        function  drawAxis(params)
        {
            xAxis = d3.svg.axis().tickSize(0)
                    .scale(xScale)
                    .orient("bottom");
            yAxis = d3.svg.axis().tickSize(0)
                    .scale(yScale)
                    .orient("left");


            //labels for the x axis        
            chart.append("g")
                    .classed("x axis", true)
                    .attr("transform", "translate(" + 0 + "," + params.height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .classed('x-axis-label', true)
                    .style("text-anchor", "center")
                    //.attr("dx", -8)
                    .attr("dy", 20)


            chart.append("g")
                    .classed("y axis", true)
                    .attr("transform", "translate(0,0)")
                    .call(yAxis);


            //     chart.selectAll("g.y.axis text").attr("visibility", "hidden");


        }//end draw axis

        /**
         * update the graph, this is public
         * 
         * @param {type} newData
         * @returns {undefined}
         */
        function update(newData)
        {
             xScale.domain(newData.map(function (entry) {
                return entry.key;
            }))
             chart.select("g.x.axis").call( xAxis)
                    .selectAll("g.x.axis text")
                    .classed('x-axis-label', true)
                    .style("text-anchor", "center")
                    //.attr("dx", -8)
                    .attr("dy", 20).transition();
             yScale = d3.scale.linear()
                    .domain([0, d3.max(newData, function (d) {
                            return d.value;
                        })])
                    .range([ graphHeight, 0]);

             yAxis = d3.svg.axis().tickSize(0)
                    .scale( yScale)
                    .orient("left");

            d3.select('g.y.axis').call( yAxis)

            //update bars
             
            var newBars =  chart.selectAll(".bar").data(newData)
            newBars.
                    transition()
                    .attr("x", function (d, i) {
                        //this determines the displacement of the bars
                        return  xScale(d.key) + ( xScale.rangeBand() * .125);



                    })
                    .attr("y", function (d, i) {
                        return   yScale(d.value) - 1;
                    })
                    .attr("height", function (d, i) {
                        return  graphHeight -  yScale(d.value);
                    })
                    .attr("width", function (d) {
                        //this determines the width (1-.75)/2 use for x above
                        return   xScale.rangeBand() * .75;
                    })
                    .style("fill", function (d, i) {
                        return  getColorForBar(i);
                    });

            //update bars

            //update baseline
            d3.select('.baseline-group')
                    .attr("transform", "translate(0," + ( yScale( baseLine)) + ")");
        
        
        }//end update
///


    /**
     * plot the initial graph 
     * @param {type} params
     * @returns {undefined}
     */
        function  plot(params) {



            xScale = d3.scale.ordinal()
                    .domain(params.data.map(function (entry) {
                        return entry.key;
                    }))
                    .rangeBands([0, params.width]);
            yScale = d3.scale.linear()
                    .domain([0, d3.max(params.data, function (d) {
                            return d.value;
                        })])
                    .range([params.height, 0]);

            drawAxis.call(this, params);

            var me = this;

            //enter
            chart.selectAll(".bar")
                    .data(params.data)
                    .enter()
                    .append("rect")
                    .classed("bar", true)

                    .on("mouseover", tip.show)
                    .on("mouseout", tip.hide)
            var baseLineGroup = chart.append('g')
                    .classed("baseline-group", true)
                    .attr("transform", "translate(0," + (yScale(baseLine)) + ")");

            //the base line
            baseLineGroup.append("line")
                    .classed("baseline-line", true)
                    .style("stroke", "black")
                    .style("stroke-dasharray", "4,2")
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", params.width)
                    .attr("y2", 0);

            baseLineGroup.append("text")
                    .classed("baseline-label", true)
                    // .attr("text-anchor", "right")
                    .attr('font-weight', 'bolder')
                    //.attr('font-size','20px')
                    .attr("transform", "translate(" + (params.width * .9)
                            + ",-10)")
                    .text("Baseline 1.0");


            //update
            chart.selectAll(".bar")

                    .attr("x", function (d, i) {
                        //this determines the displacement of the bars
                        return   xScale(d.key) + xScale.rangeBand() * .125;

                    })
                    .attr("y", function (d, i) {
                        return   yScale(d.value) - 1;
                    })
                    .attr("height", function (d, i) {
                        return params.height - yScale(d.value);
                    })
                    .attr("width", function (d) {
                        //this determines the width (1-.75)/2 use for x above
                        return   xScale.rangeBand() * .75;
                    })
                    .style("fill", function (d, i) {
                        return  getColorForBar(i);
                    });
            ///end update

        }//plot


        plot(params);

        ////////////////////////////////////////////////////////////////////
        exports = function () {}
        exports.update = function(newData) { update(newData) };
        return exports;




    }// end init




}


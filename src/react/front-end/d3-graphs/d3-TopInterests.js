/* global d3 */
module.exports =
        {

            getColorForBar: function (i)
            {

                return '#ddd'

            },

            svg: null,
            chart: null,
            margin: null,
            xAxis: null,
            yAxis: null,
            xScale: null,
            yScale: null,
            graphWidth: 0,
            graphHeight: 0,
            boxHeight: 0,
            baseLine: 1,
            boxWidth: 0,
            data: null,
            tip: d3.tip().attr('class', 'd3-tip').html(function (d) {
                return d.value;
            }),

            graphSelector: null,

            update: function (newData)
            {
                this.xScale.domain(newData.map(function (entry) {
                    return entry.key;
                }))
                this.chart.select("g.x.axis").call(this.xAxis)
                        .selectAll("g.x.axis text")
                        .classed('x-axis-label', true)
                        .style("text-anchor", "center")
                        //.attr("dx", -8)
                        .attr("dy", 20).transition();
                this.yScale = d3.scale.linear()
                        .domain([0, d3.max(newData, function (d) {
                                return d.value;
                            })])
                        .range([this.graphHeight, 0]);

                this.yAxis = d3.svg.axis().tickSize(0)
                        .scale(this.yScale)
                        .orient("left");

                d3.select('g.y.axis').call(this.yAxis)

                //update bars
                var me = this;
                var newBars = this.chart.selectAll(".bar").data(newData)
                newBars.
                        transition()
                        .attr("x", function (d, i) {
                            //this determines the displacement of the bars
                           return me.xScale(d.key) + (me.xScale.rangeBand() * .125);

                            

                        })
                        .attr("y", function (d, i) {
                            return  me.yScale(d.value) - 1;
                        })
                        .attr("height", function (d, i) {
                            return me.graphHeight - me.yScale(d.value);
                        })
                        .attr("width", function (d) {
                            //this determines the width (1-.75)/2 use for x above
                            return  me.xScale.rangeBand() * .75;
                        })
                        .style("fill", function (d, i) {
                            return me.getColorForBar(i);
                        });

                //update bars
                
                //update baseline


            },
///
            init: function (initParams)
            {

                this.tip.direction('e');
                this.margin = initParams.margin;
                this.boxHeight = initParams.boxHeight;
                this.data = initParams.data;
                this.boxWidth = initParams.boxWidth;
                this.graphSelector = initParams.graphSelector;
                this.svg = d3.select(this.graphSelector).append("svg")
                        .attr("id", "chart")
                        .attr("width", this.boxWidth)
                        .attr("height", this.boxHeight);
                this.chart = this.svg.append("g")
                        .classed("display", true)
                        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top * 2 + ")");


                this.svg.call(this.tip);
                this.graphWidth = this.boxWidth - this.margin.left - this.margin.right;
                this.graphHeight = this.boxHeight - this.margin.top - this.margin.bottom;

                var params =
                        {
                            data: this.data,
                            height: this.graphHeight,
                            width: this.graphWidth 


                        };
                this.plot.call(this, params);
            },

            drawAxis: function (params)
            {
                this.xAxis = d3.svg.axis().tickSize(0)
                        .scale(this.xScale)
                        .orient("bottom");
                this.yAxis = d3.svg.axis().tickSize(0)
                        .scale(this.yScale)
                        .orient("left");


                //labels for the x axis        
                this.chart.append("g")
                        .classed("x axis", true)
                        .attr("transform", "translate(" + 0 + "," + params.height + ")")
                        .call(this.xAxis)
                        .selectAll("text")
                        .classed('x-axis-label', true)
                        .style("text-anchor", "center")
                        //.attr("dx", -8)
                        .attr("dy", 20)


                this.chart.append("g")
                        .classed("y axis", true)
                        .attr("transform", "translate(0,0)")
                        .call(this.yAxis);


                //    this.chart.selectAll("g.y.axis text").attr("visibility", "hidden");








            },

            plot: function (params) {



                this.xScale = d3.scale.ordinal()
                        .domain(params.data.map(function (entry) {
                            return entry.key;
                        }))
                        .rangeBands([0, params.width]);
                this.yScale = d3.scale.linear()
                        .domain([0, d3.max(params.data, function (d) {
                                return d.value;
                            })])
                        .range([params.height, 0]);

                this.drawAxis.call(this, params);



                //enter
                this.chart.selectAll(".bar")
                        .data(params.data)
                        .enter()
                        .append("rect")
                        .classed("bar", true)

                        .on("mouseover", this.tip.show)
                        .on("mouseout", this.tip.hide)
                var baseLineGroup = this.chart.append('g');
                var me = this;
                //the base line
                baseLineGroup.append("line")
                        .classed("baseline-line", true)
                        .style("stroke", "black")
                        .style("stroke-dasharray", "4,2")
                        .attr("x1", 0)
                        .attr("y1", this.yScale(this.baseLine))
                        .attr("x2", params.width)
                        .attr("y2", this.yScale(this.baseLine));

                baseLineGroup.append("text")
                        .classed("baseline-label", true)
                        // .attr("text-anchor", "right")
                        .attr('font-weight', 'bolder')
                        //.attr('font-size','20px')
                        .attr("transform", "translate(" + (params.width * .9)
                                + "," + (me.yScale(this.baseLine) - 7) + ")")
                        .text("Baseline 1.0");


                //update
                this.chart.selectAll(".bar")

                        .attr("x", function (d, i) {
                            //this determines the displacement of the bars
                            return  me.xScale(d.key) + me.xScale.rangeBand() * .125;

                        })
                        .attr("y", function (d, i) {
                            return  me.yScale(d.value) - 1;
                        })
                        .attr("height", function (d, i) {
                            return params.height - me.yScale(d.value);
                        })
                        .attr("width", function (d) {
                            //this determines the width (1-.75)/2 use for x above
                            return  me.xScale.rangeBand() * .75;
                        })
                        .style("fill", function (d, i) {
                            return me.getColorForBar(i);
                        });
                ///end update
/*
                this.chart.selectAll(".bar-label")
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
                this.chart.selectAll(".bar")
                        .data(params.data)
                        .exit()
                        .remove();

                this.chart.selectAll(".bar-label")
                        .data(params.data)
                        .exit()
                        .remove();
*/



            }


        }//end exports
 
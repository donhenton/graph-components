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
            w: null,
            h: null,
            data: null,
            tip: d3.tip().attr('class', 'd3-tip').html(function (d) {
                return d.value;
            }),

            graphSelector: null,
///
            init: function (initParams)
            {
                this.tip.direction('e');
                this.margin = initParams.margin;
                this.h = initParams.h;
                this.data = initParams.data;
                this.w = initParams.w;
                this.graphSelector = initParams.graphSelector;             
                this.svg = d3.select(this.graphSelector).append("svg")
                        .attr("id", "chart")
                        .attr("width", this.w)
                        .attr("height", this.h);
                this.chart = this.svg.append("g")
                        .classed("display", true)
                        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


                this.svg.call(this.tip);
                var width = this.w - this.margin.left - this.margin.right;
                var height = this.h - this.margin.top - this.margin.bottom;

                var params =
                        {
                            data: this.data,
                            height: height,
                            width: width,
                            baseline: 1


                        };
                this.plot.call(this, params, true);
            },

            drawAxis: function (params, x, y, initialize)
            {
                var xAxis = d3.svg.axis().tickSize(0)
                        .scale(x)
                        .orient("bottom");
                var yAxis = d3.svg.axis().tickSize(0)
                        .scale(y)
                        .orient("left");

                if (initialize)
                {


                    //labels for the x axis        
                    this.svg.append("g")
                            .classed("x axis", true)
                            .attr("transform", "translate(" + 0 + "," + params.height + ")")
                            .call(xAxis)
                            .selectAll("text")
                            .classed('x-axis-label', true)
                            .style("text-anchor", "center")
                            //.attr("dx", -8)
                            .attr("dy", 20)


                    this.svg.append("g")
                            .classed("y axis", true)
                            .attr("transform", "translate(0,0)")
                            .call(yAxis);


                    this.svg.selectAll("g.y.axis text").attr("visibility", "hidden");


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


            },

            plot: function (params, initialize) {



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

                this.drawAxis.call(this, params, x, y, initialize);



                //enter
                this.svg.selectAll(".bar")
                        .data(params.data)
                        .enter()
                        .append("rect")
                        .classed("bar", true)

                        .on("mouseover", this.tip.show)
                        .on("mouseout", this.tip.hide)
                var baseLineGroup = this.svg.append('g');

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

                 var me = this;       
                //update
                this.svg.selectAll(".bar")

                        .attr("x", function (d, i) {
                            //this determines the displacement of the bars
                            return  x(d.key) + x.rangeBand() * .125;

                        })
                        .attr("y", function (d, i) {
                            return  y(d.value) - 1;
                        })
                        .attr("height", function (d, i) {
                            return params.height - y(d.value);
                        })
                        .attr("width", function (d) {
                            //this determines the width (1-.75)/2 use for x above
                            return  x.rangeBand() * .75;
                        })
                        .style("fill", function (d, i) {
                            return me.getColorForBar(i);
                        });


                this.svg.selectAll(".bar-label")
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
                this.svg.selectAll(".bar")
                        .data(params.data)
                        .exit()
                        .remove();

                this.svg.selectAll(".bar-label")
                        .data(params.data)
                        .exit()
                        .remove();




            }


        }//end exports
 
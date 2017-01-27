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
            
            graphSelector = null,

            init: function (initParams)
            {
                this.tip.direction('e');
                margin = initParams.margin;
                this.h = initParams.h;
                this.data = initParams.data;
                this.w = initParams.w;
                this.graphSelector = initParams.graphSelector;
                var w = 800;
                this.svg = d3.select(this.graphSelector).append("svg")
                        .attr("id", "chart")
                        .attr("width", w)
                        .attr("height", h);
                this.chart = this.svg.append("g")
                        .classed("display", true)
                        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


                svg.call(tip);
                var width = w - this.margin.left - this.margin.right;
                var height = h - this.margin.top - this.margin.bottom;

                var params =
                        {
                            data: this.data,
                            height: height,
                            width: width,
                            baseline: 1


                        };
                plot.call(chart, params, true);
            }



        }
 
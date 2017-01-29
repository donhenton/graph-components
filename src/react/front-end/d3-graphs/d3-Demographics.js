module.exports = {

    /**
     * 
     * @param {type} el the place to attach , eg $('#pieMain')[0]
     * @param {type} props {width: 300, height: 300} the dim of the total graph
     * @param {type} id  this is the id of the graph eg 'pie1' assigned to svg
     * @param {type} data an array of 
     * 
     *  
            {"name": "US", "percentage": 61, color: '#F79221'},
     * colors must be unique as they are the key
     * 
     * @returns {nm$_d3-Demographics.exports}
     */
    init: function (el, props, id, data)
    {

        var svgGroup = null;
        var svg = null;
        var delay = 250;
        var element = el;
        var context = id;
        var legendHeight = 26;
        var intervals = [];
        var pieWidth = props.width;
        var pieHeight = props.height;
        var radius = Math.min(pieWidth, pieHeight) / 2;
        var radius = 0.85 * radius;
        var svg = d3.select(element).append('svg')
                .attr('id', id)
                .attr('width', props.width + 300)
                .attr('height', props.height)
        svgGroup = svg
                //.attr("style", "display:block; margin: 0 auto;")
                .append("g")
                .attr("transform", "translate(" + (radius + 10) + "," + radius + ")");
        var arc = d3.svg.arc()
                .outerRadius(radius - 5)
                .innerRadius(0);
        var labelArc = d3.svg.arc()
                .outerRadius((radius))
                .innerRadius(radius * 0.65);
        var keyfunctionP = function (d) {
            if (d.color)
            {
                return d.color;
            } else
            {
                return d.data.color;
            }


        };

        var keyfunction = keyfunctionP.bind(this)
        build(data);

   

    function build(data)
    {

        
        var pie = d3.layout.pie()
                .value(function (d) {
                    return d.percentage;
                })
                .sort(function (d1, d2) {
                    return d1.percentage > d2.percentage
                });
        var arcs = pie(data);
        var pieWithData =  svgGroup.selectAll('path').data(arcs, keyfunction);
        pieWithData.enter().append('path')
                .attr("d", arc)
                .each(function (d) {
                    this._current = d;
                })
                .attr("fill", function (d) {
                    return d.data.color
                })

        //////////// outer text labels /////////////////
        var textWithData = svgGroup.selectAll("text").data(arcs, keyfunction);
        textWithData.enter().append("text")
                .attr("transform", function (d) {
                    return "translate(" + labelArc.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .attr("font-weight", "bold")
                .attr("fill", "#ffffee")
                .attr("font-size", "10px")
                .text(function (d) {
                    return d.data.name ;
                });


        ////exit ////////////////////////////////////////////////
        textWithData.exit().remove();
        pieWithData.exit().remove();
        setTransitionsForSlices(pieWithData);
        setTransitionsForText(textWithData);
        createLegend(data);


    }

    function createLegend(data)
    {
        data = data.sort(function(a,b){return a.percentage < b.percentage})
        var self = this;
        var legendGroup = svg.append('g').attr("class", 'legend-group')
        var textGroup = svg.selectAll("text.legend-text").data(data, keyfunction);
        var circleGroup = svg.selectAll(".legend-circle").data(data, keyfunction);
        legendGroup.append("text")
                .attr("text-anchor", "left")
                .attr("fill", "black")
                .attr("font-size", "18px")
                .attr("font-weight", "bold")
                .attr("transform", "translate(5,-5)")
                .text("Legend");

        legendGroup.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 1)
                .attr("width", 120)
                .style("stroke", 'black')
                .style("fill", "none")
                .style("stroke-width", 2);
        legendGroup.attr('transform', "translate(" + (props.width) + ",20)")

        textGroup.enter()
                .append("text")
                .attr("class", 'legend-text')
                .attr("text-anchor", "left")
                .attr("fill-opacity",1)
                .attr("fill", "black")
                .attr("font-size", "15px")
                .attr('transform', function (d, i)
                {
                    return "translate( 220, " + (50 + (i * 30)) + ")"
                })
                .text(function (d) {
                    return d.name + " (" + d.percentage + "%)";
                });
                
        textGroup.transition().duration(200).attr("fill-opacity",.5)        
         .text(function (d) {
                    return d.name + " (" + d.percentage + "%)";
                }).attr("fill", "red") 
         .transition().duration(600).attr("fill-opacity",1).attr("fill", "black")           

        circleGroup.enter()
                .append('circle')
                .attr('class', 'legend-circle')
                .attr("r", 4)
                .attr(
                        'transform', function (d, i) {
                            return "translate( 400, " + (65 + (i * 30)) + ")"

                        })
                .attr('fill', function (d, i) {
                    return d.color;
                });


        textGroup.exit().remove();
        circleGroup.exit().remove();

    }

    function setTransitionsForText(textWithData)
    {
        var self = this;
        textWithData
                .transition().duration(delay).attr("transform", function (d) {
            return "translate(" + labelArc.centroid(d) + ")";
        })
                .text(function (d) {
                    return d.data.name ;
                });

    }

    function setTransitionsForSlices(pieWithData)
    {
        var self = this;
        function cv_arcTween(a) {
            var i = d3.interpolate(this._current, a);
            var _current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }

        pieWithData.transition().duration(delay).attrTween("d", cv_arcTween);


    }
 
    
         ////////////////////////////////////////////////////////////////////
        exports = function () {}
        exports.update = function (newData) {


            build(data);
        };
        return exports;




    }, // end init
    

}

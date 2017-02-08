var React = require('react');
var d3 = require('d3');
var _ = require('lodash');
var Extend = require('extend');
var topInterests = require("./../d3-graphs/d3-TopInterests");

module.exports = React.createClass({

    getInitialState: function () {

        return {data: this.formatData(this.props.data)};
    },

    componentWillMount: function () {

    },

    graphUpdater: null,

    componentDidMount: function () {


        var margin = {
            top: 20,
            bottom: 70,
            left: 30,
            right: 30
        };
        var params1 = {

            margin: margin,
            boxHeight: 450,
            data: this.state.data,
            boxWidth: 800,
            graphSelectorId: this.props.graphId
        }

        $("#graphRow").html('<div  id="'+this.props.graphId+'"></div>');
         
        
            this.graphUpdater = topInterests.init(params1);
         
    },

    formatData(d)
    {
        return d;
    },

    componentWillReceiveProps: function (nextProps) {
        var newData = this.formatData(nextProps.data);
        this.setState({data: newData});
        this.graphUpdater.update(newData)
    },

    render: function () {
        return (
                <div id="graphRow" className="row">
                
                
                </div>
                )
    }
});

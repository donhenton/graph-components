var React = require('react');
var d3 = require('d3');
var _ = require('lodash');
var Extend = require('extend');


module.exports = React.createClass({

    getInitialState: function () {

        return {data: this.formatData(this.props.data)};
    },

    componentWillMount: function () {

    },
    
    formatData(d)
    {
        return d;
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({data: this.formatData(nextProps.data)});
    },

    

    render: function () {
        return (
                <div className="top-interests">
                    Data is  {this.state.data.alpha}
                </div>
                )
    }
});

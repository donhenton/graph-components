var React = require('react');



module.exports = React.createClass({

    getInitialState: function () {

        return {data: this.props.data};
    },

    componentWillMount: function () {

    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({data: nextProps.data});
    },

    data: {"alpha": 100},

    render: function () {
        return (
                <div className="top-interests">
                    Data is  {this.state.data.alpha}
                </div>
                )
    }
});

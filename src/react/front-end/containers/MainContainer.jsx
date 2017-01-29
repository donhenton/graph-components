var React = require('react');
var TopInterests = require('./../components/TopInterests')
var Demographics = require('./../components/Demographics')

var data1 = [
    {key: "Food Brands", value: 2},
    {key: "Award Shows", value: 2.8},
    {key: "Motherhood", value: 1.05}];
var data2 = [
    {key: "Manny", value: 1.2},
    {key: "Moe", value: .87},
    {key: "Motherhood", value: .7}];

module.exports = React.createClass({

    getInitialState: function () {

        return {flip: 0, data: data1};
    },

    componentWillMount: function () {

    },


    changeData: function ()
    {
         
        if (this.state.flip)
        {

            this.setState({flip: 0, data: data1});
        } else
        {
            this.setState({flip: 1, data: data2});
        }


    },

    render: function () {
        return (
                <div>
                <h3>Demographics</h3>
                <Demographics />
                <hr/>
                <h3>Top Interests</h3>
                <section>
                    <div className="row">
                        <button onClick={this.changeData} className="btn btn-primary">Change Data</button>
                    </div>
                    <div className="row">
                        <TopInterests graphId="topInterestsGraph" data={this.state.data} />
                    </div>
                    
                </section>
                </div>

                )
    }
});

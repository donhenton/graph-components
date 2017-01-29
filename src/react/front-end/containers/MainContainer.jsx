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

var demographicData1 = {
    listData: ['California','Michigan','Nevada'],
    language: [
            {"name": "English", "percentage": 61, color: '#F79221'},
            {"name": "English/Great Britain", "percentage": 9, color: '#00AEEF'},
            {"name": "French", "percentage": 20, color: '#1EAE5D'}  ]
}

module.exports = React.createClass({

    getInitialState: function () {

        return {flip: 0, data: data1,demographicData: demographicData1};
    },

    componentWillMount: function () {

    },


    changeInterestsData: function ()
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
                <Demographics data={this.state.demographicData}/>
                <hr/>
                <h3>Top Interests</h3>
                <section>
                    <div className="row">
                        <button onClick={this.changeInterestsData} className="btn btn-primary">Change Data</button>
                    </div>
                    <div className="row">
                        <TopInterests graphId="topInterestsGraph" data={this.state.data} />
                    </div>
                    
                </section>
                </div>

                )
    }
});

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
    listData: ['California', 'Michigan', 'Nevada'],
    gender: [
        {"name": "Male", "percentage": 83, color: '#F79221'},
        {"name": "Female", "percentage": 17, color: '#00AEEF'}],
    language: [
        {"name": "English", "percentage": 61, color: '#F79221'},
        {"name": "English/Great Britain", "percentage": 9, color: '#00AEEF'},
        {"name": "French", "percentage": 20, color: '#1EAE5D'}]
}
var demographicData2 = {
    listData: ['New Jersey', 'Tennesee', 'Wyoming'],
     gender: [
        {"name": "Male", "percentage": 22, color: '#F79221'},
        {"name": "Female", "percentage": 78, color: '#00AEEF'}],
    language: [
        {"name": "Urdu", "percentage": 21, color: '#ccc'},
        {"name": "English/Great Britain", "percentage": 49, color: '#00AEEF'},
        {"name": "Coptic", "percentage": 30, color: '#00cc00'}]

}

module.exports = React.createClass({

    getInitialState: function () {

        return {demographicsFlip: 0, interestFlip: 0, data: data1, demographicData: demographicData1};
    },

    componentWillMount: function () {

    },

    changeInterestsData: function ()
    {

        if (this.state.interestFlip)
        {

            this.setState({interestFlip: 0, data: data1});
        } else
        {
            this.setState({interestFlip: 1, data: data2});
        }


    },

    changeDemographicsData: function ()
    {

        if (this.state.demographicsFlip)
        {

            this.setState({demographicsFlip: 0, demographicData: demographicData1});
        } else
        {
            this.setState({demographicsFlip: 1, demographicData: demographicData2});
        }


    },

    render: function () {
        return (
                <div>
                    <h3>Demographics</h3>
                    <div className="row">
                        <button onClick={this.changeDemographicsData} className="btn btn-primary">Update Demographics</button>
                    </div>
                    <Demographics data={this.state.demographicData}/>
                    <hr/>
                    <h3>Top Interests</h3>
                    <section>
                        <div className="row">
                            <button onClick={this.changeInterestsData} className="btn btn-primary">Update Interests</button>
                        </div>
                        <div className="row">
                            <TopInterests graphId="topInterestsGraph" data={this.state.data} />
                        </div>
                
                    </section>
                </div>

                )
    }
});

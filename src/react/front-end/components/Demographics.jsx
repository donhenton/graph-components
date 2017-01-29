var React = require('react');
var demoGraphicsPieChart = require('./../d3-graphs/d3-Demographics');
module.exports = React.createClass({

    getInitialState: function () {

        return {data: this.formatData(this.props.data)};
    },

    formatData(d)
    {
        return d;
    },
    componentWillMount: function () {

    },
    languagePieChart: null,
    
    componentDidMount: function () {
        
         
        var languagePoint = $('<div  id="languagePieChart"></div>')
                .appendTo($("#languagePieLocation"))
        var props = {width: 200, height: 200};
         
        //el, props, id, data
        this.languagePieChart = demoGraphicsPieChart
                .init(languagePoint[0],props,"languagePie",this.props.data.language);
    },
    
    componentWillReceiveProps: function (nextProps) {
        var newData = this.formatData(nextProps.data);
        this.setState({data: newData});
        //this.graphUpdater.update(newData)
    },
    
    renderList: function ()
    {
        var items = [];
        var idx = 1;
        this.state.data.listData.forEach(l => { 
                     
                    items.push(  <li key={idx}> 
                            <svg height="30" width="300">                   
                            <circle cx="15" cy="15" r="14"   fill="black" />
                            <text x="9" y="22"    className="numberText">{idx}</text>
                            <text x="75" y="22"   className="labelText">{l}</text>              
                            </svg>
                        </li> )
                    idx++;
                    });
                    
                     
         return items;
    },

    render: function () {
        return (
                <section className="demoGraphics-container">
                
                    <div className="demoGraphics-block topListing-block">
                
                        <div className="topListingBlock-controls">
                            <span className="topListingBlock-title inactive">States</span> <a className="topListingBlock-link" href="#">Countries</a>
                        </div>
                
                        <div className="topListing">
                            <ul>
                                {this.renderList()}
                            </ul>
                
                        </div>
                
                
                
                    </div>
                
                
                
                
                    <div className="demoGraphics-block"><div className="topListingBlock-title">Gender</div></div>
                    <div className="demoGraphics-block">
                        <div className="topListingBlock-title">Language</div>
                        <div id="languagePieLocation"></div>
                    </div>
                </section>

                );
    }
});

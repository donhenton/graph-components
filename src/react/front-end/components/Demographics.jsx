var React = require('react');
module.exports = React.createClass({
    
    
    getInitialState: function () {

        return {data: this.formatData(this.props.data)};
    },

     formatData(d)
    {
        return d;
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
                <li> 
                    <svg height="30" width="300">                   
                    <circle cx="15" cy="15" r="14"   fill="black" />
                    <text x="9" y="22"     className="numberText">1</text>
                    <text x="75" y="22"   className="labelText">Michigan</text>              
                    </svg>
                </li>
                <li> 
                    <svg height="30" width="300">                   
                    <circle cx="15" cy="15" r="14"   fill="black" />
                    <text x="9" y="22"     className="numberText">2</text>
                    <text x="75" y="22"  className="labelText">Nevada</text>              
                    </svg>
                </li> <li> 
                    <svg height="30" width="300">                   
                    <circle cx="15" cy="15" r="14"   fill="black" />
                    <text x="9" y="22"     className="numberText">3</text>
                    <text x="75" y="22" className="labelText">California</text>              
                    </svg>
                </li>
            </ul>

        </div>



    </div>




    <div className="demoGraphics-block"><div className="topListingBlock-title">Gender</div></div>
    <div className="demoGraphics-block"><div className="topListingBlock-title">Language</div></div>
</section>

        );
}
});

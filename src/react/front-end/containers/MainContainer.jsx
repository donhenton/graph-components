var React = require('react');
var TopInterests = require('./../components/TopInterests')


module.exports = React.createClass({
    
    
    
    getInitialState: function(){
        
      return {};
    },

    componentWillMount: function(){
         
    },
    
    data: {"alpha":100},
    
    render: function () {
         return (
                   <TopInterests data={this.data} />
                )
    }
});

'use strict';

var React = require('react');

var Icon = React.createClass({
  getDefaultProps: function() {
    return {
      type: 'circle'
    };
  },

  getInitialState: function() {
    return {
      type: 'circle'
    };
  },

  propTypes: {
    type: React.PropTypes.string.isRequired
  },

  render: function() {
    var className = "fa fa-"+ this.props.type + " fa-5x";

    return (
      <div className="card-icon"><i className={className}></i></div>
    )
  }
});

module.exports = Icon;



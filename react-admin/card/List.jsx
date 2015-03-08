'use strict';

var React = require('react');
var B = require('react-bootstrap');

var List = React.createClass({
  render: function() {
    return (
      <B.Col md={6}>
        <div className="card">
          {this.props.children}
        </div>
      </B.Col>
    )
  }
});

module.exports = List;
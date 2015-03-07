"use strict";

var React = require("react");
var B = require("react-bootstrap");

var List = React.createClass({
  displayName: "List",
  render: function () {
    return React.createElement(
      B.Col,
      { md: 6 },
      React.createElement(
        "div",
        { className: "card" },
        this.props.children
      )
    );
  }
});

module.exports = List;
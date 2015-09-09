"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var React = require('react');

exports["default"] = React.createClass({
    displayName: "Notification",

    render: function render() {
        return React.createElement(
            "div",
            { className: "card__notification" },
            this.props.children
        );
    }
});
module.exports = exports["default"];
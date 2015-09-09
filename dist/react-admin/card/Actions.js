"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var React = require('react');

exports["default"] = React.createClass({
    displayName: "Actions",

    render: function render() {
        return React.createElement(
            "div",
            { className: "card__actions" },
            this.props.children
        );
    }
});
module.exports = exports["default"];
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var React = require('react');

exports["default"] = React.createClass({
    displayName: "Content",

    render: function render() {
        return React.createElement(
            "div",
            { className: "card__content" },
            this.props.children
        );
    }
});
module.exports = exports["default"];
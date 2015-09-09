'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var B = require('react-bootstrap');

exports['default'] = React.createClass({
    displayName: 'List',

    render: function render() {
        return React.createElement(
            B.Col,
            { md: 6 },
            React.createElement(
                'div',
                { className: 'card' },
                this.props.children
            )
        );
    }
});
module.exports = exports['default'];
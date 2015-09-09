'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');

exports['default'] = React.createClass({
    displayName: 'Icon',

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'circle'
        };
    },

    getInitialState: function getInitialState() {
        return {
            type: 'circle'
        };
    },

    propTypes: {
        type: React.PropTypes.string.isRequired
    },

    render: function render() {
        var className = "fa fa-" + this.props.type + " fa-5x";

        return React.createElement(
            'div',
            { className: 'card__icon' },
            React.createElement('i', { className: className })
        );
    }
});
module.exports = exports['default'];
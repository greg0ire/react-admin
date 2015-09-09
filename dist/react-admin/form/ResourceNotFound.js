'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');

exports['default'] = React.createClass({
    displayName: 'ResourceNotFound',

    getDefaultProps: function getDefaultProps() {
        return {
            reference: 'Not defined'
        };
    },

    getInitialState: function getInitialState() {
        return {
            reference: 'Not defined'
        };
    },

    propTypes: {
        reference: React.PropTypes.node.isRequired
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'col-sm-12 col-md-12 main' },
            React.createElement(
                'h2',
                { className: 'sub-header' },
                'Not Found'
            ),
            React.createElement(
                'div',
                { className: 'well' },
                'Unable to found the ressource: ',
                this.props.reference,
                '.'
            )
        );
    }
});
module.exports = exports['default'];
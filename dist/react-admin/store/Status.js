'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');

var Action = Reflux.createAction();

exports.Action = Action;
var Store = Reflux.createStore({
    init: function init() {
        this.listenTo(Action, this.onUpdate);
    },
    onUpdate: function onUpdate() {
        this.trigger.apply(this, arguments);
    }
});

exports.Store = Store;
var Component = React.createClass({
    displayName: 'Component',

    mixins: [Reflux.ListenerMixin],
    getInitialState: function getInitialState() {
        return {
            show: true,
            message: 'Welcome Back!!',
            style: 'info',
            dismissAfter: 4000
        };
    },
    onStatusChange: function onStatusChange(style, message, dismissAfter) {
        this.setState({
            style: style,
            message: message,
            dismissAfter: dismissAfter || 2000,
            show: true
        });
    },
    componentDidMount: function componentDidMount() {
        this.listenTo(Store, this.onStatusChange);
    },
    render: function render() {
        if (!this.state.show) {
            return React.createElement('span', null);
        }

        return React.createElement(
            'div',
            { className: 'react-app-status' },
            React.createElement(
                B.Alert,
                { bsStyle: this.state.style, onDismiss: this.handleAlertDismiss, dismissAfter: this.state.dismissAfter },
                this.state.message
            )
        );
    },
    handleAlertDismiss: function handleAlertDismiss() {
        this.setState({ show: false });
    }
});
exports.Component = Component;
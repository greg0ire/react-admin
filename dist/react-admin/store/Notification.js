'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');
var _ = require('lodash');

var Action = Reflux.createAction();

exports.Action = Action;
var Store = Reflux.createStore({
    init: function init() {
        this.history = [];
        this.listenTo(Action, this.addNotification);
    },
    addNotification: function addNotification(component, props) {
        this.history.unshift([component, props || {}]);

        if (this.history.length > 32) {
            this.history.pop();
        }

        this.trigger(this.history);
    }
});

exports.Store = Store;
var Component = React.createClass({
    displayName: 'Component',

    mixins: [Reflux.ListenerMixin],
    getInitialState: function getInitialState() {
        return {};
    },
    onNotifications: function onNotifications(notifications) {
        this.setState({
            notifications: notifications
        });
    },
    componentDidMount: function componentDidMount() {
        this.listenTo(Store, this.onNotifications);
    },
    render: function render() {
        var pos = 0;
        return React.createElement(
            'div',
            { className: 'react-app-notifications' },
            React.createElement(
                'h1',
                null,
                'Notifications'
            ),
            React.createElement(
                'div',
                null,
                _.map(this.state.notifications, function (notification) {

                    notification[1].key = "react-app-notification-element-" + pos;
                    pos++;

                    return React.createElement(notification[0], notification[1]);
                }, this)
            )
        );
    }
});
exports.Component = Component;
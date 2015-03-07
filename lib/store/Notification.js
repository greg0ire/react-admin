"use strict";

var React = require("react");
var B = require("react-bootstrap");
var Reflux = require("reflux");
var _ = require("lodash");

var action = Reflux.createAction();

var store = Reflux.createStore({
    init: function () {
        this.history = [];
        this.listenTo(action, this.addNotification);
    },
    addNotification: function (component, props) {
        this.history.unshift([component, props || {}]);

        if (this.history.length > 32) {
            this.history.pop();
        }

        this.trigger(this.history);
    }
});

var component = React.createClass({
    displayName: "component",
    mixins: [Reflux.ListenerMixin],
    getInitialState: function () {
        return {};
    },
    onNotifications: function (notifications) {
        this.setState({
            notifications: notifications });
    },
    componentDidMount: function () {
        this.listenTo(store, this.onNotifications);
    },
    render: function () {
        var pos = 0;
        return React.createElement(
            "div",
            { className: "react-app-notifications" },
            React.createElement(
                "h1",
                null,
                "Notifications"
            ),
            React.createElement(
                "div",
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

module.exports = {
    Action: action,
    Store: store,
    Component: component
};
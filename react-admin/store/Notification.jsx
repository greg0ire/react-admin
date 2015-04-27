var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');
var _ = require('lodash');

export var Action = Reflux.createAction();

export var Store = Reflux.createStore({
    init () {
        this.history = [];
        this.listenTo(Action, this.addNotification);
    },
    addNotification (component, props) {
        this.history.unshift([component, props || {}]);

        if (this.history.length > 32) {
            this.history.pop();
        }

        this.trigger(this.history);
    }
});

export var Component = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState () {
        return {};
    },
    onNotifications (notifications) {
        this.setState({
            notifications: notifications,
        });
    },
    componentDidMount () {
        this.listenTo(Store, this.onNotifications);
    },
    render () {
        var pos = 0;
        return (
            <div className="react-app-notifications">
                <h1>Notifications</h1>
                <div>
                    {_.map(this.state.notifications, function (notification) {

                        notification[1].key = "react-app-notification-element-" + pos;
                        pos++;

                        return React.createElement(notification[0], notification[1]);
                    }, this)}
                </div>
            </div>
        );
    }
});
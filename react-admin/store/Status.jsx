'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');

var action = Reflux.createAction();

var store = Reflux.createStore({
  init: function() {
    this.listenTo(action, this.onUpdate);
  },
  onUpdate: function() {
    this.trigger.apply(this, arguments);
  }
});

var component = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState: function() {
        return {
            show: true,
            message: 'Welcome Back!!',
            style: 'info',
            dismissAfter: 4000
        };
    },
    onStatusChange: function(style, message, dismissAfter) {
        this.setState({
            style: style,
            message: message,
            dismissAfter: dismissAfter || 2000,
            show: true
        });
    },
    componentDidMount: function () {
        this.listenTo(store, this.onStatusChange);
    },
    render: function() {
        if (!this.state.show) {
          return <span />;
        }

        return (
          <div className="react-app-status">
            <B.Alert bsStyle={this.state.style} onDismiss={this.handleAlertDismiss} dismissAfter={this.state.dismissAfter}>
              {this.state.message}
            </B.Alert>
          </div>
        );
    },
    handleAlertDismiss: function() {
        this.setState({show: false});
    }
});

module.exports = {
    Action: action,
    Store: store,
    Component: component
}
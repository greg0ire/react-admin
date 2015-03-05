'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var ReactAdmin = require('react-admin');


var NotificationElement = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    action: React.PropTypes.string.isRequired
  },
  render: function() {
      return (
        <div className="react-app-notifications__element">
          <Router.Link to="app1">{this.props.name}</Router.Link> <br />
          Action: {this.props.action} - {this.props.type}
        </div>
      );
  }
});

var Dashboard = React.createClass({
  addNotification: function() {
    ReactAdmin.Notification.Action(NotificationElement, {
      name: "the new notification",
      messsage: "a custome message",
      action: "update"
    });
  },
  render: function() {
    return (
      <div>

        <p>The dashboard is pretty empty, just add your components to make it live</p>
        <br />
        <br />
        <B.Button onClick={this.addNotification}>Add Notification</B.Button>
      </div>
    )
  }
});

module.exports = Dashboard;

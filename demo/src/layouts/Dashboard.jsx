'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var ReactAdmin = require('react-admin');

var NotificationElement = require('component/NotificationElement.jsx');

var Dashboard = React.createClass({
  addNotification: function() {
    ReactAdmin.Notification.Action(NotificationElement, {
      name: "the new notification",
      action: "update"
    });
  },
  render: function() {
    return (
      <div className="col-md-12">
        <h2>Welcome!</h2>

        <p>
          This is an interactive demo of the <code>React Admin</code> project. You can click on the different elements
          to see what there are up too. You also see the demo as a learning project to build your next application.
        </p>

        <h2>Features</h2>
        <h3>Notification</h3>
        <p>
          The notification will render a new element on the left panel. To send a notification, just
          send a component and its related props to <code>ReactAdmin.Notification.Action</code> action.
        </p>
        <ul>
          <li><B.Button bsStyle="link" onClick={this.addNotification}>Add Notification</B.Button></li>
        </ul>

        <h3>Status</h3>
        <p>
          The status is a small visual element used to send confirmation or error notice to the user.
        </p>
        <ul>
          <li><B.Button bsStyle="link" onClick={ReactAdmin.Status.Action.bind(null, "warning", "Et voila: the warning message!!", 2000)}>Send a warning message for 2s</B.Button></li>
          <li><B.Button bsStyle="link" onClick={ReactAdmin.Status.Action.bind(null, "success", "Et voila: the success message!!", 1000)}>Send a short success message</B.Button></li>
          <li><B.Button bsStyle="link" onClick={ReactAdmin.Status.Action.bind(null, "info", "Et voila: the information message!!", 1000000)}>Send a very long information message</B.Button></li>
        </ul>
      </div>
    )
  }
});

module.exports = Dashboard;

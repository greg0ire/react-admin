'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var ReactAdmin = require('react-admin');

var NotificationElement = require('component/NotificationElement.jsx');

export default React.createClass({
    addNotification() {
        ReactAdmin.Notification.Action(NotificationElement, {
            name: "the new notification",
            action: "update",
            id: 1
        });
    },
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div class="page-header">
                            <h1>Welcome!</h1>
                        </div>
                        <div className="well">
                            This is an interactive demo of the <code>React Admin</code> project.
                            You can click on the different elements to see what there are up too.<br/>
                            You also see the demo as a learning project to build your next application.
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h2>Features</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Notification</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p className="well">
                            The notification will render a new element on the left panel. To send a notification, just
                            send a component and its related props to <code>ReactAdmin.Notification.Action</code> action.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <B.Button bsStyle="default" onClick={this.addNotification}>Add Notification</B.Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Status</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p className="well">
                            The status is a small visual element used to send confirmation or error notice to the user.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>send status</p>
                        <B.ButtonGroup>
                            <B.Button bsStyle="default" onClick={ReactAdmin.Status.Action.bind(null, "warning", "Et voila: the warning message!!", 2000)}>warning for 2s</B.Button>
                            <B.Button bsStyle="default" onClick={ReactAdmin.Status.Action.bind(null, "success", "Et voila: the success message!!", 1000)}>short success message</B.Button>
                            <B.Button bsStyle="default" onClick={ReactAdmin.Status.Action.bind(null, "info", "Et voila: the information message!!", 1000000)}>very long information</B.Button>
                        </B.ButtonGroup>
                    </div>
                </div>
            </div>
        )
    }
});
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
                        <div className="page-header">
                            <h2>Welcome!</h2>
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
                        <h3>Features</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h4>Roles</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p className="well">
                            The <code>ReactAdmin.Roles.Has</code> component can be used to render element
                            if the user has the related roles.
                        </p>
                        <B.ButtonGroup>
                            <B.Button bsStyle="default" onClick={ReactAdmin.Roles.Store.toggleRole.bind(null, "EDITOR")}>Toggle role EDITOR</B.Button>
                            <B.Button bsStyle="default" onClick={ReactAdmin.Roles.Store.toggleRole.bind(null, "SUPER_ADMIN")}>Toggle role SUPER_ADMIN</B.Button>
                        </B.ButtonGroup>

                        <ReactAdmin.Roles.Has roles={["SUPER_ADMIN"]} element="div" className="foobar" style={{border: '1px solid black', padding: '5px', margin: '5px'}}>
                            <span>Only user with SUPER_ADMIN role </span>
                            <span>can view this message</span>
                        </ReactAdmin.Roles.Has>

                        <ReactAdmin.Roles.Has roles={["EDITOR"]}>
                            <div style={{border: '1px solid black', padding: '5px', margin: '5px'}}>Only user with EDITOR role can view this message </div>
                        </ReactAdmin.Roles.Has>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h4>Notification</h4>
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
                        <h4>Status</h4>
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
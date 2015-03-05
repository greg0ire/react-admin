'use strict'

var React = require('react');
var ReactAdmin = require('react-admin');
var Router = require('react-router');
var _ = require('lodash');

var Form = require('./Form.jsx');
var List = require('./List.jsx');

/**
 * This is used to build the nested view required by React Router
 */
var View = React.createClass({
  render: function() {
    return <Router.RouteHandler />
  }
});

/**
 * Define the routes required to list or edit the node
 */
function getRoutes() {
  return <Router.Route name="app1" handler={View} >

    <Router.Route name="app1.list"  path="list" handler={List} />
    <Router.Route name="app1.edit"  path="edit/:uuid" handler={Form} />

    <Router.DefaultRoute handler={List} />
  </Router.Route>
}

//var historyStore = require('./stores/History.jsx')();
//
//
//historyStore.listenTo(streamStore, historyStore.addHistory);
//
//streamStore.listen(function(data) {
//    var component = factory.get(data.type, 'notification.element');
//    if (!component) {
//        // TODO: log error ?
//        console.log("Empty component for notification:", data);
//        return;
//    }
//
//    ReactAdmin.Notification.Action(component, data || {})
//});

module.exports = {
  getRoutes: getRoutes
}

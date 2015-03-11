'use strict'

var React  = require('react');
var Router = require('react-router');

var Form = require('./Form.jsx');
var List = require('./List.jsx');

/**
 * This is used to build the nested view required by React Router
 */
var View = React.createClass({
    render() {
        return <Router.RouteHandler />
    }
});

/**
 * Define the routes required to list or edit the node
 */
function getRoutes() {
   return <Router.Route name="app1" handler={View} >

      <Router.Route name="app1.list"  path="list" handler={List} />
      <Router.Route name="app1.edit"  path="edit/:id" handler={Form} />

      <Router.DefaultRoute handler={List} />
   </Router.Route>
}

module.exports = {
    getRoutes: getRoutes
}
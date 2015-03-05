'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var RB = require('react-router-bootstrap')
var ReactAdmin = require('react-admin');

var NodeInformationCard = require('./helpers/NodeInformationCard.jsx');
var NodeNotificationCard = require('./helpers/NodeNotificationCard.jsx');

var List = ReactAdmin.createTable({
  getDefaultProps: function() {
    return {
      className: "col-sm-12 col-md-12 main",
      per_page: 32,
      index: "app1.list"
    }
  },

  refreshGrid: function(filters) {
    // todo
  },

  renderRow: function(node) {

    // todo
//    var factory = ReactAdmin.Container("gonodes.factory");
//
//    var component = factory.get(node, 'list.element');
//
//    // load the form part for the current node
//    return React.createElement(component, {node:node, key: "form-list-" + node.uuid})
  }
});

module.exports = List;

'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var RB = require('react-router-bootstrap')
var ReactAdmin = require('react-admin');

var faker = require('faker');
var _ = require('lodash');

var List = ReactAdmin.createTable({
  getDefaultProps: function() {
    return {
      className: "col-sm-12 col-md-12 main",
      per_page: 32,
      index: "app1.list"
    }
  },

  generateData: function() {
    return {
      name: faker.name.findName(),
      avatar: faker.internet.avatar(),
      bio: faker.hacker.phrase(),
      account: faker.finance.account(),
      count: faker.random.number()
    }
  },

  refreshGrid: function(filters) {
    var filters = this.getFilters(filters);

    this.setState({
      page: filters.page,
      per_page: filters.per_page,
      base_query: {},
      elements: Array.apply(null, {length: 32}).map(Function.call, this.generateData)
    });
  },

  renderRow: function(data)
  {
    // this method should be overwritten to create your own rendering element
    return <ReactAdmin.Card.List>
      <ReactAdmin.Card.Icon type="circle-thin" />

      <ReactAdmin.Card.Notification>
        <B.Label bsStyle="warning">{data.count}</B.Label>
      </ReactAdmin.Card.Notification>

      <ReactAdmin.Card.Title>
        {data.name}
      </ReactAdmin.Card.Title>

      <ReactAdmin.Card.Content>
        {data.bio}
      </ReactAdmin.Card.Content>

      <ReactAdmin.Card.Information>
      {data.account}
      </ReactAdmin.Card.Information>

      <ReactAdmin.Card.Actions>
        <a href="" >edit</a>
      </ReactAdmin.Card.Actions>

    </ReactAdmin.Card.List>
  }
});

module.exports = List;

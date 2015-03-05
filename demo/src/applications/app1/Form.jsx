'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var Reflux = require('reflux');
var _ = require('lodash');

var ReactAdmin = require('react-admin');

var Form = React.createClass({
  mixins: [Router.State, Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      node: {
        name: "loading node ..."
      },
      errors: {}
    };
  },

  componentDidMount: function() {
    this.loadData();
  },

  refreshView: function() {
    this.setState({
      node: this.state.node
    });
  },

  componentWillReceiveProps: function() {
    this.loadData();
  },

  submit: function() {
        // todo ...
  },

  loadData: function() {
        // todo
  },

  render: function() {

        // todo

    return (
      <div className="col-sm-12 col-md-12 main">
        <h2 className="sub-header">Edit {this.state.node.name} (rev: {this.state.node.revision}) </h2>

        <form>
          <div className="row">
            <div className="col-sm-6">
              <ReactAdmin.TextInput form={this} property="name" label="Name" help="Enter the name"/>
              <ReactAdmin.TextInput form={this} property="slug" label="Slug" help="Enter the slug"/>
            </div>
            <div className="col-sm-6">
              <ReactAdmin.BooleanSelect form={this} property="enabled" label="enabled">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
              </ReactAdmin.BooleanSelect>

              <ReactAdmin.NumberSelect form={this} property="status" label="Status">
                  <option value="0">New</option>
                  <option value="1">Draft</option>
                  <option value="2">Completed</option>
                  <option value="3">Validated</option>
              </ReactAdmin.NumberSelect>

              <ReactAdmin.NumberInput form={this} property="weight" help="error message " label="Weight" />
            </div>
          </div>

          {CustomForm}
        </form>

        <B.Button bsStyle="primary" onClick={this.submit}>Save</B.Button>
      </div>
    );
  }
});

module.exports = Form;


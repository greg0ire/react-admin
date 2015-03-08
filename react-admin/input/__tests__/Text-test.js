/** @jsx React.DOM */

jest.dontMock('../Text.jsx');
jest.dontMock('lodash');

describe('TextInput', function() {
  it('render text input', function() {
    var React = require('react/addons');
    var TextInput = require('../Text.jsx');
    var TestUtils = React.addons.TestUtils;

    var form = {
      state: {node: {}, errors: {}}
    }

    var Input = TestUtils.renderIntoDocument(
      <TextInput.Text form={form} value="hello world"/>
    );

    var B = require('react-bootstrap');

    // Verify that it's Off by default
    var widget = TestUtils.findRenderedComponentWithType(Input, B.Input);
  });

  it('render textarea input', function() {
    var React = require('react/addons');
    var TextInput = require('../Text.jsx');
    var TestUtils = React.addons.TestUtils;

    var form = {
      state: {node: {}, errors: {}}
    }

    var Input = TestUtils.renderIntoDocument(
      <TextInput.TextArea form={form} value="hello world"/>
    );

    var B = require('react-bootstrap');

    // Verify that it's Off by default
    var widget = TestUtils.findRenderedComponentWithType(Input, B.Input);
  });

  it('render double password input', function() {
    var React = require('react/addons');
    var TextInput = require('../Text.jsx');
    var TestUtils = React.addons.TestUtils;

    var form = {
      state: {node: {}, errors: {}}
    }

    var Input = TestUtils.renderIntoDocument(
      <TextInput.DoublePassword form={form} value="hello world"/>
    );

    var B = require('react-bootstrap');

    // Verify that it's Off by default
      var widget = TestUtils.scryRenderedComponentsWithType(Input, B.Input);
  });
});

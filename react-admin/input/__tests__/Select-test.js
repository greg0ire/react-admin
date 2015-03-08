/** @jsx React.DOM */

jest.dontMock('../Select.jsx');
jest.dontMock('lodash');

describe('SelectInput', function() {
  it('render number input', function() {
    var React = require('react/addons');
    var Component = require('../Select.jsx');
    var TestUtils = React.addons.TestUtils;

    var form = {
      state: {node: {}, errors: {}}
    }

    var Input = TestUtils.renderIntoDocument(
      <Component.Select form={form} value="hello world"/>
    );

    var B = require('react-bootstrap');

    // Verify that it's Off by default
    var widget = TestUtils.findRenderedComponentWithType(Input, B.Input);
  });
});

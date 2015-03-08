/** @jsx React.DOM */

jest.dontMock('../Boolean.jsx');
jest.dontMock('lodash');

describe('BooleanInput', function() {
  it('render bool input', function() {
    var React = require('react/addons');
    var BooleanInput = require('../Boolean.jsx');
    var TestUtils = React.addons.TestUtils;

    var form = {
      state: {node: {}, errors: {}}
    }

    var Input = TestUtils.renderIntoDocument(
      <BooleanInput form={form} value="hello world"/>
    );

    var B = require('react-bootstrap');

    // Verify that it's Off by default
    var widget = TestUtils.findRenderedComponentWithType(Input, B.Input);
  });
});

/** @jsx React.DOM */

jest.dontMock('../Number.jsx');
jest.dontMock('lodash');

describe('NumberInput', function() {
  it('render number input', function() {
    var React = require('react/addons');
    var NumberInput = require('../Number.jsx');
    var TestUtils = React.addons.TestUtils;

    var form = {
      state: {node: {}, errors: {}}
    }

    var Input = TestUtils.renderIntoDocument(
      <NumberInput form={form} value="hello world"/>
    );

    var B = require('react-bootstrap');

    // Verify that it's Off by default
    var widget = TestUtils.findRenderedComponentWithType(Input, B.Input);
  });
});

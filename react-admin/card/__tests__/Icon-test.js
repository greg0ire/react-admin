/** @jsx React.DOM */

jest.dontMock('../Icon.jsx');
jest.dontMock('lodash');

describe('Icon Card', function() {
  it('render icon card', function() {
    var React = require('react/addons');
    var Component = require('../Icon.jsx');
    var TestUtils = React.addons.TestUtils;

    var DomNode = TestUtils.renderIntoDocument(
      <Component type="round" />
    );

    // Verify that it's Off by default
    var widget = TestUtils.scryRenderedDOMComponentsWithTag(DomNode, "div");
  });
});

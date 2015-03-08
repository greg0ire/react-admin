/** @jsx React.DOM */

jest.dontMock('../Notification.jsx');
jest.dontMock('lodash');

describe('Notification Card', function() {
  it('render Notification card', function() {
    var React = require('react/addons');
    var Component = require('../Notification.jsx');
    var TestUtils = React.addons.TestUtils;

    var DomNode = TestUtils.renderIntoDocument(
      <Component type="round" >
        <span>Salut</span>
      </Component>
    );

    // Verify that it's Off by default
    var widget = TestUtils.scryRenderedDOMComponentsWithTag(DomNode, "span");
  });
});

/** @jsx React.DOM */

jest.dontMock('../Information.jsx');
jest.dontMock('lodash');

describe('Information Card', function() {
  it('render Information card', function() {
    var React = require('react/addons');
    var Component = require('../Information.jsx');
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

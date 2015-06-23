jest.dontMock('../ResourceNotFound.jsx');
jest.dontMock('lodash');

describe('ResourceNotFound', function () {
    it('render resource not found', function () {
        var React = require('react/addons');
        var Component = require('../ResourceNotFound.jsx');
        var TestUtils = React.addons.TestUtils;

        var DomNode = TestUtils.renderIntoDocument(
            <Component reference="1" />
        );

        // Verify that it's Off by default
        var widget = TestUtils.scryRenderedDOMComponentsWithTag(DomNode, "div");
    });
});

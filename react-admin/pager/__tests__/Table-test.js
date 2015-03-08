/** @jsx React.DOM */

jest.dontMock('../Table.jsx');
jest.dontMock('lodash');
jest.dontMock('react-router-bootstrap');

describe('Table test', function() {
  it('render table', function() {
    var React = require('react/addons');
    var TableFactory = require('../Table.jsx').create;
    var TestUtils = React.addons.TestUtils;

    var Table = TableFactory({});

    var Input = TestUtils.renderIntoDocument(
      <Table />
    );

    var B = require('react-bootstrap');

    // Verify that it's Off by default
    var widget = TestUtils.findRenderedComponentWithType(Input, B.Input);
  });
});

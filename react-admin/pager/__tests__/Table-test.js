jest.dontMock('../Table.jsx');
jest.dontMock('lodash');
jest.dontMock('react-router-bootstrap');

describe('Table test', () => {
    it('render table', () => {
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

    it('test factory with mixins', () => {
        var React = require('react/addons');
        var TableFactory = require('../Table.jsx').create;
        var TestUtils = React.addons.TestUtils;

        var Table = TableFactory({mixins: [{foo: () => {}}]}, {mixins: [{bar: () => {}}]});

        // need to find a way to check if the foo / bar mixins are available...
        //expect(Table.mixins).toEqual(['foo', 'bar']);

    })
});

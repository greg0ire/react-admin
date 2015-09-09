'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.create = create;
var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');

var Card = {
    List: require('../card/List'),
    Icon: require('../card/Icon'),
    Information: require('../card/Information'),
    Notification: require('../card/Notification')
};

var Create = require('../utils/Create');

var _ = require('lodash');
var Url = require('url');

var BaseTable = {
    mixins: [Router.Navigation, Router.State],

    propTypes: {
        index: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        per_page: React.PropTypes.number,
        show_filters: React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: "col-sm-12 col-md-12 main",
            per_page: 32,
            show_filters: true
        };
    },

    getInitialState: function getInitialState() {
        return {
            page: 1,
            per_page: this.props.per_page,
            next: null,
            previous: null,
            elements: [],
            filters: []
        };
    },

    componentDidMount: function componentDidMount() {
        this.refreshGrid();
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
        this.refreshGrid();
    },

    refreshGrid: function refreshGrid() {
        console.log("You need to implement the refreshGrid method");
    },

    // update the url with the search criteria
    search: function search(inc) {
        var params = {
            page: 1,
            per_page: this.props.per_page
        };

        var inc = Number.isInteger(inc) ? inc : 0;

        params = _.assign(params, 'filters' in this.state ? this.state.filters : {});

        if (inc === 0) {
            params.page = 1;
        } else {
            params.page = parseInt(params.page, 10) + inc;
        }

        params.per_page = parseInt(params.per_page, 10);

        this.transitionTo(this.props.index, null, params);
    },

    getFilters: function getFilters(extras) {
        var filters = {
            page: 1,
            per_page: this.props.per_page
        };

        filters = _.assign(filters, 'filters' in this.state ? this.state.filters : {});
        filters = _.assign(filters, this.getQuery());
        filters = _.assign(filters, extras || {});

        filters.page = parseInt(filters.page, 10);
        filters.per_page = parseInt(filters.per_page, 10);

        return filters;
    },

    getPage: function getPage(inc) {
        var page = this.getFilters().page + inc;

        if (page < 1) {
            page = 1;
        }

        return page;
    },

    renderRow: function renderRow(element) {
        // this method should be overwritten to create your own rendering element
        return React.createElement(
            Card.List,
            null,
            React.createElement(
                Card.Information,
                null,
                'The information card'
            ),
            React.createElement(Card.Icon, { type: 'circle-thin' }),
            'You should overwrite the ',
            React.createElement(
                'code',
                null,
                'renderRow'
            ),
            ' method to create your own card/row. You can also refer to the ',
            React.createElement(
                'a',
                { href: 'https://github.com/rande/react-admin/blob/master/docs/components/Card.md', target: '_blank' },
                'related documentation'
            ),
            '.',
            React.createElement(
                Card.Notification,
                null,
                'The notification card'
            )
        );
    },

    renderFilters: function renderFilters() {
        return React.createElement(
            B.Row,
            null,
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                'You should overwrite the ',
                React.createElement(
                    'code',
                    null,
                    'renderFilters'
                ),
                ' method to add your filters or return null if done is required. ',
                React.createElement('br', null),
                'You can also refer to the ',
                React.createElement(
                    'a',
                    { href: 'https://github.com/rande/react-admin/blob/master/docs/components/Filters.md', target: '_blank' },
                    'related documentation'
                ),
                '.'
            )
        );
    },

    render: function render() {
        var filters = null;

        if (this.props.show_filters) {
            filters = this.renderFilters();
        }

        return React.createElement(
            'div',
            { className: this.props.className },
            filters,
            React.createElement(
                B.Row,
                null,
                _.map(this.state.elements, this.renderRow, this)
            ),
            React.createElement(
                B.Pager,
                null,
                React.createElement(
                    'li',
                    { className: 'previous' },
                    React.createElement(
                        Router.Link,
                        { to: this.props.index, query: this.getFilters({ page: this.getPage(-1) }), onClick: this.search.bind(this, -1) },
                        '← Previous Page'
                    )
                ),
                React.createElement(
                    'li',
                    { className: 'next' },
                    React.createElement(
                        Router.Link,
                        { to: this.props.index, query: this.getFilters({ page: this.getPage(1) }), onClick: this.search.bind(this, 1) },
                        'Next Page →'
                    )
                )
            )
        );
    }
};

function create() {
    return Create(BaseTable, arguments);
}
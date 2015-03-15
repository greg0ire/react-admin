'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var RB = require('react-router-bootstrap');

var Card = {
    List: require('../card/List.jsx'),
    Icon: require('../card/Icon.jsx'),
    Information: require('../card/Information.jsx'),
    Notification: require('../card/Notification.jsx')
}

var _ = require('lodash');
var Url = require('url');

var BaseTable = {
    mixins: [Router.State],

    propTypes: {
        index: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        per_page: React.PropTypes.number
    },

    getDefaultProps () {
        return {
            className: "col-sm-12 col-md-12 main",
            per_page: 32
        }
    },

    getInitialState () {
        return {
            page: 1,
            per_page: this.props.per_page,
            next: null,
            previous: null,
            elements: []
        };
    },

    componentDidMount () {
        this.refreshGrid();
    },

    refreshGrid() {
        console.log("You need to implement the refreshGrid method");
    },
    getFilters (extras) {
        var filters = {
            page: 1,
            per_page: 32
        }

        filters = _.assign(filters, this.getQuery())
        filters = _.assign(filters, extras || {})

        filters.page = parseInt(filters.page, 10);
        filters.per_page = parseInt(filters.per_page, 10);

        return filters;
    },

    getPage (inc) {
        var page = this.getFilters().page + inc;

        if (page < 1) {
            page = 1;
        }

        return page;
    },

    renderRow (element) {
        // this method should be overwritten to create your own rendering element
        return <Card.List>
            <Card.Information >
                The information card
            </Card.Information>

            <Card.Icon type="circle-thin" />

            A message you can use

            <Card.Notification>
                The notification card
            </Card.Notification>
        </Card.List>
    },

    render () {
        return (
            <div className={this.props.className}>
                <B.Row>
                    {_.map(this.state.elements, this.renderRow, this)}
                </B.Row>

                <B.Pager>
                    <li className="previous">
                        <Router.Link to={this.props.index} query={{page: this.getPage(-1)}} onClick={this.refreshGrid.bind(this, {page: this.getPage(-1)})} >&larr; Previous Page</Router.Link>
                    </li>
                    <li className="next">
                        <Router.Link to={this.props.index} query={{page: this.getPage(1)}} onClick={this.refreshGrid.bind(this, {page: this.getPage(1)})} >Next Page &rarr;</Router.Link>
                    </li>
                </B.Pager>
            </div>
        );
    }
};

function keep(key, obj, def) {
    if (key in def) {
        for (var m in def[key]) {
            obj[key].push(def[key][m]);
        }

        delete def[key];
    }
}

module.exports = {
    create () {
        var klass = _.merge({mixins: []}, BaseTable);

        _.forEach(arguments, function (def) {
            keep('mixins', klass, def);
            keep('propTypes', klass, def);

            klass = _.merge(klass, def);
        })

        return React.createClass(klass);
    }
};

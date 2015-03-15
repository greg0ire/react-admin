'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var RB = require('react-router-bootstrap');
var ReactAdmin = require('react-admin');
var Reflux = require('reflux');

var faker = require('faker');

var Store = require('./Store.jsx');

export default ReactAdmin.createTable({
    mixins: [Reflux.ListenerMixin],
    getDefaultProps() {
        return {
            className: "col-sm-12 col-md-12 main",
            per_page:  32,
            index:     "app1.list"
        }
    },

    componentDidMount() {
        this.refreshGrid({});

        this.listenTo(Store.objectsStore, () => {
            this.refreshGrid({});
        });
    },
    refreshGrid(filters) {
        var filters = this.getFilters(filters);

        var elements = []

        for(var i = ((filters.page - 1) * filters.per_page); i < ((filters.page) * filters.per_page); i++ ) {
            elements.push(Store.objectsStore.objects[i])
        }

        this.setState({
            page: filters.page,
            per_page: filters.per_page,
            base_query: {},
            elements: elements
        });
    },

    renderRow(data) {
        // this method should be overwritten to create your own rendering element
        return <ReactAdmin.Card.List key={data.id}>
            <ReactAdmin.Card.Icon type="circle-thin" />

            <ReactAdmin.Card.Notification>
                <B.Label bsStyle="warning">{data.count}</B.Label>
            </ReactAdmin.Card.Notification>

            <ReactAdmin.Card.Title>
                {data.name}
            </ReactAdmin.Card.Title>

            <ReactAdmin.Card.Content>
                {data.bio}
            </ReactAdmin.Card.Content>

            <ReactAdmin.Card.Information>
                {data.account}
            </ReactAdmin.Card.Information>

            <ReactAdmin.Card.Actions>
                <i className="fa fa-chevron-circle-right"></i> <Router.Link to="app1.edit" params={{id: data.id}}>Edit</Router.Link>
            </ReactAdmin.Card.Actions>
        </ReactAdmin.Card.List>
    }
});

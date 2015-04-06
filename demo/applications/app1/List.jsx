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
    getInitialState() {
        // define default values
        return {
            filters: {name: ""},
            errors: {}
        };
    },
    mixins: [Reflux.ListenerMixin],
    getDefaultProps() {
        return {
            className:    "col-sm-12 col-md-12 main",
            per_page:     32,
            index:        "app1.list",
            show_filters: true
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
        var filteredElements = [];
        var elements = [];

        // in a normal case, you will probably call a webservice to retrieve elements
        Store.objectsStore.objects.forEach((v, i) => {
            if (this.state.filters.name.length == 0 || v.name.toLowerCase().indexOf(this.state.filters.name.toLowerCase()) > -1) {
                filteredElements.push(v);
            }
        })

        for(var i = ((filters.page - 1) * filters.per_page); i < ((filters.page) * filters.per_page); i++ ) {
            if (filteredElements[i]) {
                elements.push(filteredElements[i])
            }
        }

        this.setState({
            page: filters.page,
            per_page: filters.per_page,
            elements: elements
        });
    },

    refreshView() {
        this.setState({
            filters: this.state.filters
        })
    },

    renderFilters() {
        return <B.Row>
            <div className="col-sm-4">
                <ReactAdmin.TextInput form={this} property="filters.name" addonBefore="Name"/>
            </div>
            <div className="col-sm-4">

            </div>
            <div className="col-sm-4">
                <B.Button bsStyle="primary" onClick={this.refreshGrid}>Search</B.Button>
            </div>
        </B.Row>
    },

    renderRow(data) {
        // this method should be overwritten to create your own rendering element
        return <ReactAdmin.Card.List key={data.id}>
            <ReactAdmin.Card.Icon type="circle-thin" />

            <ReactAdmin.Card.Notification>
                <B.Label bsStyle="warning">{data.count}</B.Label>
            </ReactAdmin.Card.Notification>

            <ReactAdmin.Card.Title>
                <Router.Link to="app1.edit" params={{id: data.id}}>{data.name}</Router.Link>
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

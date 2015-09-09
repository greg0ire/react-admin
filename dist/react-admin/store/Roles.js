'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');

var Add = Reflux.createAction();
exports.Add = Add;
var Replace = Reflux.createAction();

exports.Replace = Replace;
var Store = Reflux.createStore({
    init: function init() {
        this.roles = [];
        this.listenTo(Add, this.onAdd);
        this.listenTo(Replace, this.onReplace);
    },
    onAdd: function onAdd(roles) {
        this.roles = this.roles.concat(roles);
        this.trigger.apply(this, this.roles);
    },
    onReplace: function onReplace(roles) {
        this.roles = roles;
        this.trigger.apply(this, this.roles);
    },
    hasRole: function hasRole(roles) {
        if (arguments.length == 0 || typeof roles == 'undefined') {
            return true;
        }

        if (typeof roles == "string") {
            roles = [roles];
        }

        if (roles.length == 0) {
            return true;
        }

        var has = false;

        for (var key in roles) {
            var role = roles[key];

            if (this.roles.indexOf(role) > -1) {
                has = true;
            }
        }

        return has;
    },
    removeRole: function removeRole(role) {
        var pos = this.roles.indexOf(role);

        if (pos > -1) {
            delete this.roles[pos];
        }

        this.trigger.apply(this, this.roles);
    },
    addRole: function addRole(role) {
        var pos = this.roles.indexOf(role);
        if (pos > -1) {
            return;
        }

        this.roles.push(role);

        this.trigger.apply(this, this.roles);
    },
    toggleRole: function toggleRole(role) {
        var pos = this.roles.indexOf(role);

        if (pos > -1) {
            this.removeRole(role);
        } else {
            this.addRole(role);
        }
    }
});

exports.Store = Store;
var Has = React.createClass({
    displayName: 'Has',

    mixins: [Reflux.ListenerMixin],

    propTypes: {
        roles: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]),
        element: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        className: React.PropTypes.string,
        style: React.PropTypes.object
    },

    getInitialState: function getInitialState() {
        return { show: false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            roles: [],
            element: "span",
            className: "",
            style: {}
        };
    },

    onRolesChange: function onRolesChange() {
        this.setState({
            show: Store.hasRole(this.props.roles)
        });
    },

    componentDidMount: function componentDidMount() {
        this.listenTo(Store, this.onRolesChange);

        this.onRolesChange();
    },

    render: function render() {
        if (!this.state.show) {
            return null;
        }

        if (this.props.children.length > 1) {
            return React.createElement(this.props.element, {
                className: this.props.className,
                style: this.props.style
            }, this.props.children);
        }

        return this.props.children;
    }
});
exports.Has = Has;
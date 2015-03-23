'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');

export var Add = Reflux.createAction();
export var Replace = Reflux.createAction();

export var Store = Reflux.createStore({
    init () {
        this.roles = [];
        this.listenTo(Add, this.onAdd);
        this.listenTo(Replace, this.onReplace);
    },
    onAdd (roles) {
        this.roles = this.roles.concat(roles);
        this.trigger.apply(this, this.roles);
    },
    onReplace (roles) {
        this.roles = roles;
        this.trigger.apply(this, this.roles);
    },
    hasRole (roles) {
        var has = false;

        for (var key in roles) {
            let role = roles[key];

            if (this.roles.indexOf(role) > -1) {
                has = true;
            }
        }

        return has;
    },
    removeRole(role) {
        var pos = this.roles.indexOf(role);

        if (pos > -1) {
            delete(this.roles[pos]);
        }

        this.trigger.apply(this, this.roles);
    },
    addRole(role) {
        var pos = this.roles.indexOf(role);
        if (pos > -1) {
            return;
        }

        this.roles.push(role);

        this.trigger.apply(this, this.roles);
    },
    toggleRole(role) {
        var pos = this.roles.indexOf(role);

        if (pos > -1) {
            this.removeRole(role);
        } else {
            this.addRole(role);
        }
    }
});

export var Has = React.createClass({
    mixins: [Reflux.ListenerMixin],

    propTypes: {
        roles: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array
        ]),
        element: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        className: React.PropTypes.string,
        style: React.PropTypes.object
    },

    getInitialState: function() {
        return {show: false};
    },

    getDefaultProps () {
        return {
            roles:     [],
            element:   "span",
            className: "",
            style:     {}
        }
    },

    onRolesChange () {
        var roles = [];
        if (typeof this.props.roles == "string") {
            roles.append(this.props.roles);
        } else {
            roles = this.props.roles;
        }

        this.setState({
            show: Store.hasRole(roles)
        });
    },

    componentDidMount () {
        this.listenTo(Store, this.onRolesChange);

        this.onRolesChange();
    },

    render () {
        if (!this.state.show) {
            return null;
        }

        if (this.props.children.length > 1) {
            return React.createElement(this.props.element, {
                className: this.props.className,
                style:     this.props.style
            }, this.props.children);
        }

        return this.props.children;
    }
});
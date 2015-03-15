'use strict';

var React = require('react');
var B = require('react-bootstrap');
var _ = require('lodash');

var Base = {
    type: 'text',

    propTypes: {
        bsStyle (props, propName, componentName) {
            if (props.type === 'submit') {
                // Return early if `type=submit` as the `Button` component
                // it transfers these props to has its own propType checks.
                return;
            }

            return React.PropTypes.oneOf(['success', 'warning', 'error']).apply(null, arguments);
        },
        help: React.PropTypes.string,
        label: React.PropTypes.string,
        property: React.PropTypes.string,
        form: React.PropTypes.object
    },

    readValue (obj, path, def) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            if (!obj || typeof obj !== 'object') {
                return def;
            }
            obj = obj[path[i]];
        }

        if (obj === 'undefined') {
            return def;
        }

        return obj;
    },

    writeValue (obj, path, value) {
        var paths = path.split('.');
        var property = paths.pop();

        for (var i = 0, len = paths.length; i < len; i++) {
            if (!obj || typeof obj !== 'object') {
                return;
            }

            obj = obj[paths[i]];
        }

        if (obj === 'undefined') {
            return;
        }

        obj[property] = value;
    },

    getErrors () {
        if (!this.props.form) {
            return [];
        }

        return this.props.form.state.errors[this.props.property] || [];
    },

    getHelp () {
        var errors = this.getErrors();

        if (errors.length == 0) {
            return this.props.help;
        }

        return _(errors).join(",") + (this.props.help ? this.props.help : '')
    },

    updateValue (event) {
        this.setValue(event.target.value);
    },

    getValue () {
        if (!this.props.property) {
            return;
        }

        return this.readValue(this.props.form.state, this.props.property)
    },

    getStyle () {
        return this.getErrors().length > 0 ? 'error' : null;
    },

    setValue (value) {
        this.writeValue(this.props.form.state, this.props.property, value)

        this.props.form.refreshView();
    },

    isTrue (value) {
        return value == "on" || value == "true" || value == "1" || value == 1 || value == true;
    },

    parseInt (value, base) {
        var value = parseInt(value, base || 10);

        return isNaN(value) ? 0 : value;
    },

    render () {
        return <B.Input
            value={this.getValue()}
            default="Default value ..."
            type={this.type}
            label={this.props.label}
            help={this.getHelp()}
            onChange={this.updateValue}
            bsStyle={this.getStyle()}
        />
    }
};

export function create() {
    var klass = _.merge({}, Base);

    _.forEach(arguments, function (def) {
        klass = _.merge(klass, def);
    });

    return React.createClass(klass);
};
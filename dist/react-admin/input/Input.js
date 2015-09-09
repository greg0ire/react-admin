'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.create = create;
var React = require('react');
var B = require('react-bootstrap');
var Roles = require('../store/Roles');
var Create = require('../utils/Create');
var _ = require('lodash');

var Base = {
    type: 'text',

    propTypes: {
        bsStyle: function bsStyle(props, propName, componentName) {
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
        form: React.PropTypes.object,
        roles: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array])
    },

    getInitialState: function getInitialState() {
        // define default values
        return {
            show: false
        };
    },

    readValue: function readValue(obj, path, def) {
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

    writeValue: function writeValue(obj, path, value) {
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

    getErrors: function getErrors() {
        if (!this.props.form) {
            return [];
        }

        return this.props.form.state.errors[this.props.property] || [];
    },

    getHelp: function getHelp() {
        var errors = this.getErrors();

        if (errors.length == 0) {
            return this.props.help;
        }

        return _(errors).join(",") + (this.props.help ? this.props.help : '');
    },

    updateValue: function updateValue(event) {
        this.setValue(event.target.value);
    },

    getValue: function getValue() {
        if (!this.props.property) {
            return;
        }

        return this.readValue(this.props.form.state, this.props.property);
    },

    getStyle: function getStyle() {
        return this.getErrors().length > 0 ? 'error' : null;
    },

    setValue: function setValue(value) {
        this.writeValue(this.props.form.state, this.props.property, value);

        this.props.form.refreshView();
    },

    isTrue: function isTrue(value) {
        return value == "on" || value == "true" || value == "1" || value == 1 || value == true;
    },

    parseInt: (function (_parseInt) {
        function parseInt(_x, _x2) {
            return _parseInt.apply(this, arguments);
        }

        parseInt.toString = function () {
            return _parseInt.toString();
        };

        return parseInt;
    })(function (value, base) {
        var value = parseInt(value, base || 10);

        return isNaN(value) ? 0 : value;
    }),

    render: function render() {
        return React.createElement(
            Roles.Has,
            { roles: this.props.roles },
            React.createElement(B.Input, _extends({}, this.props, {
                value: this.getValue(),
                'default': 'Default value ...',
                type: this.type,
                label: this.props.label,
                help: this.getHelp(),
                onChange: this.updateValue,
                bsStyle: this.getStyle()
            }))
        );
    }
};

function create() {
    return Create(Base, arguments);
}
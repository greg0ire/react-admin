'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Input = require('./Input');
var B = require('react-bootstrap');

var Roles = require('../store/Roles');

var BaseSelect = {
    type: 'select',
    render: function render() {
        return React.createElement(
            Roles.Has,
            { roles: this.props.roles },
            React.createElement(
                B.Input,
                {
                    value: this.getValue(),
                    'default': 'Default value ...',
                    type: this.type,
                    label: this.props.label,
                    help: this.getHelp(),
                    onChange: this.updateValue,
                    bsStyle: this.getStyle()
                },
                this.props.children
            )
        );
    }
};

var Select = Input.create(BaseSelect);

exports.Select = Select;
var NumberSelect = Input.create(BaseSelect, {
    updateValue: function updateValue(event) {
        this.setValue(this.parseInt(event.target.value));
    }
});

exports.NumberSelect = NumberSelect;
var BooleanSelect = Input.create(BaseSelect, {
    updateValue: function updateValue(event) {
        this.setValue(this.isTrue(event.target.value));
    },

    render: function render() {
        return React.createElement(
            Roles.Has,
            { roles: this.props.roles },
            React.createElement(
                B.Input,
                _extends({}, this.props, {
                    value: this.getValue() ? '1' : '0',
                    type: this.type,
                    label: this.props.label,
                    help: this.getHelp(),
                    onChange: this.updateValue,
                    bsStyle: this.getStyle()
                }),
                this.props.children
            )
        );
    }
});
exports.BooleanSelect = BooleanSelect;
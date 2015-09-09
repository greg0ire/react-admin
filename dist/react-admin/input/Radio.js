'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Input = require('./Input');
var B = require('react-bootstrap');
var Roles = require('../store/Roles');

var BaseRadio = {
    type: 'radio',
    isChecked: function isChecked() {
        return this.getValue() == this.props.value;
    },

    render: function render() {
        return React.createElement(
            Roles.Has,
            { roles: this.props.roles },
            React.createElement(B.Input, _extends({}, this.props, {
                name: this.props.name,
                checked: this.isChecked(),
                'default': 'Default value ...',
                type: this.type,
                value: this.props.value,
                label: this.props.label,
                help: this.getHelp(),
                onChange: this.updateValue,
                bsStyle: this.getStyle()
            }))
        );
    }
};

var Radio = Input.create(BaseRadio);

exports.Radio = Radio;
var NumberRadio = Input.create(BaseRadio, {
    updateValue: function updateValue(event) {
        this.setValue(this.parseInt(event.target.value));
    },

    isChecked: function isChecked() {
        return this.getValue() == this.parseInt(this.props.value);
    }
});

exports.NumberRadio = NumberRadio;
var BooleanRadio = Input.create(BaseRadio, {
    updateValue: function updateValue(event) {
        this.setValue(this.isTrue(event.target.value));
    },

    isChecked: function isChecked() {
        return this.getValue() == this.isTrue(this.props.value);
    }
});
exports.BooleanRadio = BooleanRadio;
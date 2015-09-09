'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var B = require('react-bootstrap');

var Input = require('./Input');
var ReactBootstrapMixin = require('./ReactBootstrap');
var Roles = require('../store/Roles');

var Text = Input.create({
    type: 'text'
});

exports.Text = Text;
var Password = Input.create({
    type: 'password'
});

exports.Password = Password;
var TextArea = Input.create({
    type: 'textarea'
});

exports.TextArea = TextArea;
var DoublePassword = Input.create({
    mixins: [ReactBootstrapMixin],

    render: function render() {
        return this.renderInput(React.createElement(
            'span',
            null,
            React.createElement(B.Input, { type: 'text' }),
            React.createElement(B.Input, { type: 'text' })
        ));
    }
});
exports.DoublePassword = DoublePassword;
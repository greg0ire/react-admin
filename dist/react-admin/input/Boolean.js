'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Input = require('./Input');
var React = require('react');
var B = require('react-bootstrap');

var Roles = require('../store/Roles');

exports['default'] = Input.create({
    type: 'checkbox',

    updateValue: function updateValue(event) {
        this.setValue(event.target.checked);
    }
});
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Input = require('./Input');

exports['default'] = Input.create({
    updateValue: function updateValue(event) {
        this.setValue(this.parseInt(event.target.value));
    }
});
module.exports = exports['default'];
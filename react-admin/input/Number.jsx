'use strict';

var Input = require('./Input.jsx')

var Number = Input.create({
  updateValue: function(event) {
    this.setValue(this.parseInt(event.target.value));
  }
});

module.exports = Number

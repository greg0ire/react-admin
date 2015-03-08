'use strict';

var React = require('react');
var Input = require('./Input.jsx')
var B = require('react-bootstrap');

var BaseRadio = {
  type: 'radio',
  isChecked: function() {
    return this.getValue() == this.props.value;
  },
  render: function() {
    return <B.Input
      name={this.props.name}
      checked={this.isChecked()}
      default="Default value ..."
      type={this.type}
      value={this.props.value}
      label={this.props.label}
      help={this.getHelp()}
      onChange={this.updateValue}
      bsStyle={this.getStyle()}
    />
  }
}

var Radio = Input.create(BaseRadio);

var NumberRadio = Input.create(BaseRadio, {
  updateValue: function(event) {
    this.setValue(this.parseInt(event.target.value));
  },

  isChecked: function() {
    return this.getValue() == this.parseInt(this.props.value);
  }
});

var BooleanRadio = Input.create(BaseRadio, {
  updateValue: function(event) {
    this.setValue(this.isTrue(event.target.value))
  },

  isChecked: function() {
    return this.getValue() == this.isTrue(this.props.value);
  }
});

module.exports = {
  Radio: Radio,
  NumberRadio: NumberRadio,
  BooleanRadio: BooleanRadio
}

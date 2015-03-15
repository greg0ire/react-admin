'use strict';

var React = require('react');
var Input = require('./Input.jsx')
var B = require('react-bootstrap');

var BaseRadio = {
    type: 'radio',
    isChecked () {
        return this.getValue() == this.props.value;
    },

    render () {
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
};

export var Radio = Input.create(BaseRadio);

export var NumberRadio = Input.create(BaseRadio, {
    updateValue (event) {
        this.setValue(this.parseInt(event.target.value));
    },

    isChecked () {
        return this.getValue() == this.parseInt(this.props.value);
    }
});

export var BooleanRadio = Input.create(BaseRadio, {
    updateValue (event) {
        this.setValue(this.isTrue(event.target.value))
    },

    isChecked () {
        return this.getValue() == this.isTrue(this.props.value);
    }
});
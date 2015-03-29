var React = require('react');
var B = require('react-bootstrap');

var Input = require('./Input.jsx');
var ReactBootstrapMixin = require('./ReactBootstrap.jsx');
var Roles = require('../store/Roles.jsx');

export var Text = Input.create({
    type: 'text'
});

export var Password = Input.create({
    type: 'password'
});

export var TextArea = Input.create({
    type: 'textarea'
});

export var DoublePassword = Input.create({
    mixins: [ReactBootstrapMixin],

    render () {
        return this.renderInput(
            <span>
                <B.Input type="text" />
                <B.Input type="text" />
            </span>
        );
    }
});
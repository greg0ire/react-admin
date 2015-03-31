var Input = require('./Input.jsx')
var React = require('react');
var B = require('react-bootstrap');

var Roles = require('../store/Roles.jsx');

export default Input.create({
    type: 'checkbox',

    updateValue (event) {
        this.setValue(event.target.checked);
    }
});

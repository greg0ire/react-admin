var Input = require('./Input.jsx')
var React = require('react');
var B = require('react-bootstrap');

var Roles = require('../store/Roles.jsx');

export default Input.create({
    type: 'checkbox',

    updateValue (event) {
        this.setValue(event.target.checked);
    },

    render () {
        return <Roles.Has roles={this.props.roles}>
            <B.Input
                checked={this.getValue()}
                default="Default value ..."
                type={this.type}
                label={this.props.label}
                help={this.getHelp()}
                onChange={this.updateValue}
                bsStyle={this.getErrors().length > 0 ? 'error' : null}
            />
        </Roles.Has>
    }
});

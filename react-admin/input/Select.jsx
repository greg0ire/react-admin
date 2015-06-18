var React = require('react');
var Input = require('./Input.jsx')
var B = require('react-bootstrap');

var Roles = require('../store/Roles.jsx');

var BaseSelect = {
    type: 'select',
    render () {
        return <Roles.Has roles={this.props.roles}>
            <B.Input
                value={this.getValue()}
                default="Default value ..."
                type={this.type}
                label={this.props.label}
                help={this.getHelp()}
                onChange={this.updateValue}
                bsStyle={this.getStyle()}
            >
                {this.props.children}
            </B.Input>
        </Roles.Has>
    }
};

export var Select = Input.create(BaseSelect);

export var NumberSelect = Input.create(BaseSelect, {
    updateValue (event) {
        this.setValue(this.parseInt(event.target.value))
    }
});

export var BooleanSelect = Input.create(BaseSelect, {
    updateValue (event) {
        this.setValue(this.isTrue(event.target.value));
    },

    render () {
        return <Roles.Has roles={this.props.roles}>
            <B.Input
                {...this.props}
                value={this.getValue() ? '1' : '0'}
                type={this.type}
                label={this.props.label}
                help={this.getHelp()}
                onChange={this.updateValue}
                bsStyle={this.getStyle()}
            >
                 {this.props.children}
            </B.Input>
        </Roles.Has>
    }
});
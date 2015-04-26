var React = require('react');
var B = require('react-bootstrap');

export var Component = React.createClass({
    render () {
        return (
            <div className="react-app-sidebar">
                {this.props.children}
            </div>
        );
    }
});
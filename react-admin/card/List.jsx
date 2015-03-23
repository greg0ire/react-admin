var React = require('react');
var B = require('react-bootstrap');

export default React.createClass({
    render () {
        return (
            <B.Col md={6}>
                <div className="card">
                    {this.props.children}
                </div>
            </B.Col>
        );
    }
});
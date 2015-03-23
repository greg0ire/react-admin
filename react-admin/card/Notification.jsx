var React = require('react');

export default React.createClass({
    render () {
        return (
            <div className="card__notification">
                {this.props.children}
            </div>
        )
    }
});
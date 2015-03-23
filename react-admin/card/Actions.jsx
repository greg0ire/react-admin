var React = require('react');

export default React.createClass({
    render () {
        return (
            <div className="card__actions">
                {this.props.children}
            </div>
        )
    }
});

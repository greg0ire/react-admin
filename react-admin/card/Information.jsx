var React = require('react');

export default React.createClass({
    render () {
        return (
            <div className="card__information">
                {this.props.children}
            </div>
        )
    }
});
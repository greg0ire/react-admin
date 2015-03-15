'use strict';

var React = require('react');

export default React.createClass({
    render () {
        return (
            <div className="card__title">
                {this.props.children}
            </div>
        )
    }
});
'use strict';

var React = require('react');

var Title = React.createClass({
    render () {
        return (
            <div className="card__title">
                {this.props.children}
            </div>
        )
    }
});

module.exports = Title;

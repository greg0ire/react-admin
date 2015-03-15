'use strict';

var React = require('react');

var Content = React.createClass({
    render () {
        return (
            <div className="card__content">
                {this.props.children}
            </div>
        )
    }
});

module.exports = Content;

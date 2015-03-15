'use strict';

var React = require('react');

var Actions = React.createClass({
    render () {
        return (
            <div className="card__actions">
                {this.props.children}
            </div>
        )
    }
});

module.exports = Actions;

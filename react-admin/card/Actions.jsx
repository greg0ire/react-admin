'use strict';

var React = require('react');

var Actions = React.createClass({
    render: function () {
        return (
            <div className="card__actions">
                {this.props.children}
            </div>
        )
    }
});

module.exports = Actions;

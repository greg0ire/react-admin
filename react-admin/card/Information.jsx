'use strict';

var React = require('react');

var Information = React.createClass({
    render: function () {
        return (
            <div className="card__information">
                {this.props.children}
            </div>
        )
    }
});

module.exports = Information;

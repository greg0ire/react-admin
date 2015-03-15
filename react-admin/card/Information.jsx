'use strict';

var React = require('react');

var Information = React.createClass({
    render () {
        return (
            <div className="card__information">
                {this.props.children}
            </div>
        )
    }
});

module.exports = Information;

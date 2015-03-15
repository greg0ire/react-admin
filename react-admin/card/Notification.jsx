'use strict';

var React = require('react');

var Notification = React.createClass({
    render () {
        return (
            <div className="card__notification">
                {this.props.children}
            </div>
        )
    }
});

module.exports = Notification;

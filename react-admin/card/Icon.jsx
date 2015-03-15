'use strict';

var React = require('react');

export default React.createClass({
    getDefaultProps () {
        return {
            type: 'circle'
        };
    },

    getInitialState () {
        return {
            type: 'circle'
        };
    },

    propTypes: {
        type: React.PropTypes.string.isRequired
    },

    render () {
        var className = "fa fa-" + this.props.type + " fa-5x";

        return (
            <div className="card__icon">
                <i className={className}></i>
            </div>
        )
    }
});
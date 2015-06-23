var React = require('react');

export default React.createClass({

    getDefaultProps () {
        return {
            reference: 'Not defined'
        };
    },

    getInitialState () {
        return {
            reference: 'Not defined'
        };
    },

    propTypes: {
        reference: React.PropTypes.node.isRequired
    },

    render () {
        return (
            <div className="col-sm-12 col-md-12 main">
                <h2 className="sub-header">Not Found</h2>

                <div className="well">
                    Unable to found the ressource: {this.props.reference}.
                </div>
            </div>
        );
    }
});




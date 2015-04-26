var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');

export var Action = Reflux.createAction();

export var Store = Reflux.createStore({
    init () {
        this.listenTo(Action, this.onUpdate);
    },
    onUpdate () {
        this.trigger.apply(this, arguments);
    }
});

export var Component = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState () {
        return {
            show: true,
            message: 'Welcome Back!!',
            style: 'info',
            dismissAfter: 4000
        };
    },
    onStatusChange (style, message, dismissAfter) {
        this.setState({
            style: style,
            message: message,
            dismissAfter: dismissAfter || 2000,
            show: true
        });
    },
    componentDidMount () {
        this.listenTo(Store, this.onStatusChange);
    },
    render () {
        if (!this.state.show) {
            return <span />;
        }

        return (
            <div className="react-app-status">
                <B.Alert bsStyle={this.state.style} onDismiss={this.handleAlertDismiss} dismissAfter={this.state.dismissAfter}>
                    {this.state.message}
                </B.Alert>
            </div>
        );
    },
    handleAlertDismiss () {
        this.setState({show: false});
    }
});
var React  = require('react');
var B      = require('react-bootstrap');
var Reflux = require('reflux');
var classNames  = require('classnames');

export var ToggleAction = Reflux.createAction();

export var Store = Reflux.createStore({
    init () {
        this.show = false;
        this.listenTo(ToggleAction, () => {
            this.show = !this.show;

            this.trigger(this.show);
        });
    }
});

export var Component = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState() {
        return {
           show: false
        };
    },

    componentDidMount() {
        this.listenTo(Store, (show) => {
            this.setState({
                show: show
            });
        });
    },

    render () {
        var classes = classNames({
            'react-app-sidebar': true,
            'hide': !this.state.show
        });

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
});
var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');


var ReactIntl     = require('react-intl');

export var Store = Reflux.createStore({
    init () {
        this.date = new Date();

        setInterval(() => {
            this.date = new Date();

            this.trigger(this.date);
        })
    }
});

export var Component = React.createClass({
    mixins: [Reflux.ListenerMixin, ReactIntl.IntlMixin],
    getInitialState () {
        return {
            date: new Date()
        };
    },
    onTimeChange (date) {
        this.setState({
            date: date
        });
    },
    componentDidMount () {
        this.listenTo(Store, this.onTimeChange);
    },
    render () {
        return (
            <div className="react-app-clock">
                <ReactIntl.FormattedDate
                    value={this.state.date}
                    day="numeric"
                    month="long"
                    year="numeric" />
                <br />
                <ReactIntl.FormattedTime
                    value={this.state.date}
                    hour="numeric"
                    minute="numeric" />
            </div>
        );
    }
});
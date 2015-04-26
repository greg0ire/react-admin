var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');

var Intl     = require('react-intl');

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
    mixins: [Reflux.ListenerMixin, Intl.IntlMixin],
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
                <Intl.FormattedDate
                    value={this.state.date}
                    day="numeric"
                    month="long"
                    year="numeric" />
                <br />
                <Intl.FormattedTime
                    value={this.state.date}
                    hour="numeric"
                    minute="numeric" />
            </div>
        );
    }
});
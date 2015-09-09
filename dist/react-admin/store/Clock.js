'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');

var ReactIntl = require('react-intl');

var Store = Reflux.createStore({
    init: function init() {
        var _this = this;

        this.date = new Date();

        setInterval(function () {
            _this.date = new Date();

            _this.trigger(_this.date);
        });
    }
});

exports.Store = Store;
var Component = React.createClass({
    displayName: 'Component',

    mixins: [Reflux.ListenerMixin, ReactIntl.IntlMixin],
    getInitialState: function getInitialState() {
        return {
            date: new Date()
        };
    },
    onTimeChange: function onTimeChange(date) {
        this.setState({
            date: date
        });
    },
    componentDidMount: function componentDidMount() {
        this.listenTo(Store, this.onTimeChange);
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'react-app-clock' },
            React.createElement(ReactIntl.FormattedDate, {
                value: this.state.date,
                day: 'numeric',
                month: 'long',
                year: 'numeric' }),
            React.createElement('br', null),
            React.createElement(ReactIntl.FormattedTime, {
                value: this.state.date,
                hour: 'numeric',
                minute: 'numeric' })
        );
    }
});
exports.Component = Component;
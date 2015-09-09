'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var B = require('react-bootstrap');
var Reflux = require('reflux');
var classNames = require('classnames');

var ToggleAction = Reflux.createAction();

exports.ToggleAction = ToggleAction;
var Store = Reflux.createStore({
    init: function init() {
        var _this = this;

        this.show = false;
        this.listenTo(ToggleAction, function () {
            _this.show = !_this.show;

            _this.trigger(_this.show);
        });
    }
});

exports.Store = Store;
var Component = React.createClass({
    displayName: 'Component',

    mixins: [Reflux.ListenerMixin],
    getInitialState: function getInitialState() {
        return {
            show: false
        };
    },

    componentDidMount: function componentDidMount() {
        var _this2 = this;

        this.listenTo(Store, function (show) {
            _this2.setState({
                show: show
            });
        });
    },

    render: function render() {
        var classes = classNames({
            'react-app-sidebar': true,
            'hide': !this.state.show
        });

        return React.createElement(
            'div',
            { className: classes },
            this.props.children
        );
    }
});
exports.Component = Component;
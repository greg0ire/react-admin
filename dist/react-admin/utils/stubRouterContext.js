/**
 * From https://github.com/rackt/react-router/blob/master/docs/guides/testing.md
 *
 *   var stubRouterContext = require('./stubRouterContext');
 *   var IndividualComponent = require('./IndividualComponent');
 *   var Subject = stubRouterContext(IndividualComponent, {someProp: 'foo'});
 *   React.render(<Subject/>, testElement);
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var _ = require('lodash');

exports['default'] = function (Component, props, stubs) {
    function RouterStub() {}

    RouterStub = _.merge(RouterStub, {
        makePath: function makePath() {},
        makeHref: function makeHref() {},
        transitionTo: function transitionTo() {},
        replaceWith: function replaceWith() {},
        goBack: function goBack() {},
        getCurrentPath: function getCurrentPath() {},
        getCurrentRoutes: function getCurrentRoutes() {},
        getCurrentPathname: function getCurrentPathname() {},
        getCurrentParams: function getCurrentParams() {},
        getCurrentQuery: function getCurrentQuery() {},
        isActive: function isActive() {}
    }, stubs);

    return React.createClass({
        childContextTypes: {
            router: React.PropTypes.func
        },

        getChildContext: function getChildContext() {
            return {
                router: RouterStub
            };
        },

        render: function render() {
            return React.createElement(Component, props);
        }
    });
};

module.exports = exports['default'];
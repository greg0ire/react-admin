/**
 * From https://github.com/rackt/react-router/blob/master/docs/guides/testing.md
 *
 *   var stubRouterContext = require('./stubRouterContext');
 *   var IndividualComponent = require('./IndividualComponent');
 *   var Subject = stubRouterContext(IndividualComponent, {someProp: 'foo'});
 *   React.render(<Subject/>, testElement);
 */

var React = require('react');
var _ = require('lodash');

var func = React.PropTypes.func;

export default function(Component, props, stubs) {
    return React.createClass({
        childContextTypes: {
            makePath: func,
            makeHref: func,
            transitionTo: func,
            replaceWith: func,
            goBack: func,
            getCurrentPath: func,
            getCurrentRoutes: func,
            getCurrentPathname: func,
            getCurrentParams: func,
            getCurrentQuery: func,
            isActive: func
        },

        getChildContext() {
            return _.merge({}, {
                makePath() {},
                makeHref() {},
                transitionTo() {},
                replaceWith() {},
                goBack() {},
                getCurrentPath() {},
                getCurrentRoutes() {},
                getCurrentPathname() {},
                getCurrentParams() {},
                getCurrentQuery() {},
                isActive() {}
            }, stubs);
        },

        render() {
            return <Component {...props} />
        }
    });
}
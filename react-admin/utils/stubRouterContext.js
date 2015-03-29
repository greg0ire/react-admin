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

export default (Component, props, stubs) => {
    function RouterStub() {}

    RouterStub = _.merge(RouterStub, {
        makePath () {},
        makeHref () {},
        transitionTo () {},
        replaceWith () {},
        goBack () {},
        getCurrentPath () {},
        getCurrentRoutes () {},
        getCurrentPathname () {},
        getCurrentParams () {},
        getCurrentQuery () {},
        isActive () {}
    }, stubs);

    return React.createClass({
        childContextTypes: {
            router: React.PropTypes.func
        },

        getChildContext () {
            return {
                router: RouterStub
            };
        },

        render () {
            return <Component {...props} />
        }
    });
};
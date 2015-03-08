/** @jsx React.DOM */

jest.dontMock('../Notification.jsx');
jest.dontMock('lodash');
jest.dontMock('reflux');

describe('Notidication', function() {
  it('Test notification action factory', function() {
    var React = require('react/addons');
    var Notification = require('../Notification.jsx');

    var action = Notification.Action;
    var store = Notification.Store;
    var component = Notification.Component;

    var b = React.createClass({
        propTypes: {
            custom: React.PropTypes.string.isRequired
        },
        render: function() {
            return <b>Custom value: {this.props.custom}</b>
        }
    })

    store.listen(function(component, props) {
        expect(component).toEqual(b);
        expect(props).toEqual({custom: "data"});
    });

    action(b, {custom: "data"})
  });
});

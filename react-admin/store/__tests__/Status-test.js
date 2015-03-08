/** @jsx React.DOM */

jest.dontMock('../Status.jsx');
jest.dontMock('lodash');
jest.dontMock('reflux');

describe('Status', function() {
  it('Test status action factory', function() {
    var Status = require('../Status.jsx');

    var action = Status.Action;
    var store = Status.Store;
    var component = Status.Component;

    store.listen(function(status, message) {
        expect(status).toEqual("success");
        expect(status).toEqual("Loading message with success");
    });

    action("success", "Loading message with success")
  });
});

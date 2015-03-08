/** @jsx React.DOM */

jest.dontMock('../Property');
jest.dontMock('lodash');

describe('Property', function() {
  it('Read Property', function() {

    var obj = {foo: "bar", nested: {foo: "bar"}}

    var ReadValue = require('../Property').ReadValue;

    expect(ReadValue(obj, "fake")).toBeUndefined();

    expect(ReadValue(obj, "fake", "really?")).toEqual("really?");

    expect(ReadValue(obj, "foo")).toEqual("bar")
    expect(ReadValue(obj, "nested.foo")).toEqual("bar")
  });

  it('Write Property', function() {

    var obj = {foo: "bar", nested: {foo: "bar"}}

    var ReadValue = require('../Property').ReadValue;
    var WriteValue = require('../Property').WriteValue;

    WriteValue(obj, "fake", "really?")

    expect(obj.fake).toEqual("really?");

    WriteValue(obj, "nested.fake", "really?")

    expect(obj.nested.foo).toEqual("bar")
  });
});

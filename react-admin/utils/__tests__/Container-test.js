/** @jsx React.DOM */

jest.dontMock('../Container');
jest.dontMock('lodash');

describe('Container', function() {
  it('set value', function() {
    var c = require('../Container');

    expect(c).not.toBeUndefined();

    expect(c("foo")).toBeUndefined();

    c("foo", "bar");

    expect(c("foo")).not.toBeUndefined();
  });

  it('test singleton', function() {
      var a = require('../Container');
      var b = require('../Container');

      a("bar", "foo")

      expect(b("bar")).toBe("foo");
  });

  it('test parameters', function() {
      var a = require('../Container');
      var b = require('../Container');

      a().setParameter("key", {"value": 1});

      var value = b().getParameter("key");

      expect(value).toEqual({"value": 1});

      value.value = 2

      expect(value).toEqual({"value": 2});

      expect(b().getParameter("key")).toEqual({"value": 1});
      expect(a().getParameter("key")).toEqual({"value": 1});
  });
});

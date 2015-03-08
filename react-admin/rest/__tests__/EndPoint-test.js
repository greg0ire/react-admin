/** @jsx React.DOM */

jest.dontMock('../Endpoint');
jest.dontMock('lodash');

describe('Endpoint', function() {
  it('init Endpoint', function() {
    var Endpoint = require('../Endpoint');

    var e = new Endpoint('http://192.168.30.20:9090/nodes', {'Accept':'application/json'});

//    expect(c).not.toBeUndefined();
//
//    expect(c("foo")).toBeUndefined();
//
//    c("foo", "bar");
//
//    expect(c("foo")).not.toBeUndefined();
  });

});

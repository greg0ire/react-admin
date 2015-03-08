"use strict";

var _ = require("lodash");

/**
 * This is an alternate version of https://www.npmjs.com/package/configurable,
 *   The get method always return a new copy of the current settings.

 * Make `obj` configurable.
 *
 * @param {Object} obj
 * @return {Object} the `obj`
 * @api public
 */
var Container = new (function () {
  var parameters = {};
  var services = {};

  this.set = function (name, val) {
    if (1 == arguments.length) {
      for (var key in name) {
        this.set(key, name[key]);
      }
    } else {
      services[name] = val;
    }

    return this;
  };

  this.get = function (name) {
    return services[name];
  };

  this.setParameter = function (name, val) {
    if (1 == arguments.length) {
      for (var key in name) {
        this.setParameter(key, name[key]);
      }
    } else {
      parameters[name] = val;
    }

    return this;
  };

  this.getParameter = function (name) {
    return _.merge({}, parameters[name]);
  };

  this.enable = function (name) {
    return this.setParameter(name, true);
  };

  this.disable = function (name) {
    return this.setParameter(name, false);
  };

  this.enabled = function (name) {
    return !!this.getParameter(name);
  };

  this.disabled = function (name) {
    return !this.getParameter(name);
  };

  return this;
})();

module.exports = function() {
  if (arguments.length == 1) {
    return Container.get(arguments[0]);
  }

  if (arguments.length == 2) {
    return Container.set(arguments[0], arguments[1]);
  }

  return Container;
}

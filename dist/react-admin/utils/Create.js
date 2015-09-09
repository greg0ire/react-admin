'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _ = require('lodash');
var React = require('react');

function keep(key, obj, def) {
    if (key in def) {
        for (var m in def[key]) {
            obj[key].push(def[key][m]);
        }

        delete def[key];
    }
}

exports['default'] = function (From, args) {
    var klass = _.merge({
        mixins: [],
        propTypes: [],
        contextTypes: []
    }, From);

    _.forEach(args, function (def) {
        keep('mixins', klass, def);
        keep('propTypes', klass, def);
        keep('contextTypes', klass, def);

        klass = _.merge(klass, def);
    });

    return React.createClass(klass);
};

module.exports = exports['default'];
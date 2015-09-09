"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var Url = require("url");
var Request = require("superagent");
var _ = require("lodash");

exports["default"] = function (baseurl, headers) {
    var url = Url.parse(baseurl);
    var headers = headers || {};

    this.get = function () {
        var suffix, query, func;

        var _getParameters = getParameters(arguments);

        var _getParameters2 = _slicedToArray(_getParameters, 3);

        suffix = _getParameters2[0];
        query = _getParameters2[1];
        func = _getParameters2[2];

        buildRequest(Request('GET', buildUrl(suffix, query))).end(func ? func : defaultHandler);
    };

    this.del = function () {
        var suffix, query, func;

        var _getParameters3 = getParameters(arguments);

        var _getParameters32 = _slicedToArray(_getParameters3, 3);

        suffix = _getParameters32[0];
        query = _getParameters32[1];
        func = _getParameters32[2];

        buildRequest(Request('DELETE', buildUrl(suffix, query))).end(func ? func : defaultHandler);
    };

    this.post = function () {
        var suffix, query, params, func;

        var _dataParameters = dataParameters(arguments);

        var _dataParameters2 = _slicedToArray(_dataParameters, 4);

        suffix = _dataParameters2[0];
        query = _dataParameters2[1];
        params = _dataParameters2[2];
        func = _dataParameters2[3];

        buildRequest(Request('POST', buildUrl(suffix, query))).send(params).end(func ? func : defaultHandler);
    };

    this.put = function () {
        var suffix, query, params, func;

        var _dataParameters3 = dataParameters(arguments);

        var _dataParameters32 = _slicedToArray(_dataParameters3, 4);

        suffix = _dataParameters32[0];
        query = _dataParameters32[1];
        params = _dataParameters32[2];
        func = _dataParameters32[3];

        buildRequest(Request('PUT', buildUrl(suffix, query))).send(params).end(func ? func : defaultHandler);
    };

    function getParameters(args) {
        var suffix = "";
        var query = {};
        var func = false;

        if (args.length == 1 && typeof args[0] == "function") {
            func = args[0];
        }

        if (args.length == 2) {
            if (typeof args[0] == "object" && typeof args[1] == "function") {
                query = args[0];
                func = args[1];
            }

            if (typeof args[0] == "string" && typeof args[1] == "function") {
                suffix = args[0];
                func = args[1];
            }
        }

        if (args.length == 3) {
            suffix = args[0];
            query = args[1];
            func = args[2];
        }

        return [suffix, query, func];
    }

    function dataParameters(args) {
        var suffix = "";
        var query = {};
        var params = {};
        var func = false;

        if (args.length == 1 && typeof args[0] == "function") {
            func = args[0];
        }

        if (args.length == 2) {
            if (typeof args[0] == "object" && typeof args[1] == "function") {
                params = args[0];
                func = args[1];
            }

            if (typeof args[0] == "string" && typeof args[1] == "function") {
                suffix = args[0];
                func = args[1];
            }
        }

        if (args.length == 3) {
            if (typeof args[0] == "object" && typeof args[1] == "object" && typeof args[2] == "function") {
                query = args[0];
                params = args[2];
                func = args[3];
            }

            if (typeof args[0] == "string" && typeof args[1] == "object" && typeof args[2] == "function") {
                suffix = args[0];
                params = args[1];
                func = args[2];
            }
        }

        if (args.length == 4) {
            suffix = args[0];
            query = args[1];
            params = args[2];
            func = args[3];
        }

        return [suffix, query, params, func];
    }

    function buildUrl(suffix, query) {
        var baseurl = _.merge({}, url);
        baseurl.pathname += suffix;
        baseurl.query = _.merge({}, baseurl.query, query || {});

        return Url.format(baseurl);
    }

    function buildRequest(request) {
        _(headers).forEach(function (v, k) {
            request.set(k, v);
        });

        return request;
    }

    function defaultHandler(error, response) {
        console.log("error", error);
        console.log("res", res);
    }

    return this;
};

;
module.exports = exports["default"];
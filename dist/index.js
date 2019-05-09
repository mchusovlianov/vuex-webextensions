'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.default = _default);
var _backgroundScript = _interopRequireDefault(require('./backgroundScript')),
  _browser = _interopRequireDefault(require('./browser')),
  _contentScript = _interopRequireDefault(require('./contentScript'));
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a };
}
function _objectSpread(a) {
  for (var b = 1; b < arguments.length; b++) {
    var c = null == arguments[b] ? {} : arguments[b],
      d = Object.keys(c);
    'function' == typeof Object.getOwnPropertySymbols &&
      (d = d.concat(
        Object.getOwnPropertySymbols(c).filter(function(a) {
          return Object.getOwnPropertyDescriptor(c, a).enumerable;
        })
      )),
      d.forEach(function(b) {
        _defineProperty(a, b, c[b]);
      });
  }
  return a;
}
function _defineProperty(a, b, c) {
  return b in a ? Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : (a[b] = c), a;
}
var browserProxy = require('webextension-polyfill'),
  defaultOptions = { connectionName: 'vuex-webextensions', persistentStates: [] };
function _default(a) {
  if ('undefined' == typeof window)
    // This allows authors to unit test more easily
    return function() {}; // eslint-disable-line no-empty-function
  var b = _objectSpread({}, defaultOptions, a),
    c = new _browser.default(browserProxy);
  return function(a) {
    // Get type of script and initialize connection
    c.isBackgroundScript(window).then(function(d) {
      return d ? new _backgroundScript.default(a, c, b) : new _contentScript.default(a, c, b);
    });
  };
}

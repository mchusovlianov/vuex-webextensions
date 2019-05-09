'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.default = void 0);
function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++)
    (c = b[d]), (c.enumerable = c.enumerable || !1), (c.configurable = !0), 'value' in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
}
function _createClass(a, b, c) {
  return b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a;
}
/*
 *  Copyright 2018 - 2019 Mitsuha Kitsune <https://mitsuhakitsune.com>
 *  Licensed under the MIT license.
 *
 *  Custom class to apply polyfills without dependencies
 *  and offer crossbrowser compatibility
 */ var Browser = /*#__PURE__*/ (function() {
    function a(b) {
      _classCallCheck(this, a), (this.browser = b);
    }
    return (
      _createClass(a, [
        {
          key: 'isBackgroundScript',
          value: function c(a) {
            var b = this;
            return new Promise(function(c) {
              return (
                b.browser.runtime.getBackgroundPage().then(function(b) {
                  return c(a === b);
                }),
                !1
              );
            });
          }
        },
        {
          key: 'getPersistentStates',
          value: function b() {
            var a = this;
            return new Promise(function(b, c) {
              return (
                a.browser.storage.local
                  .get('@@vwe-persistence')
                  .then(function(a) {
                    return a['@@vwe-persistence'] ? b(a['@@vwe-persistence']) : b(null);
                  })
                  .catch(function(a) {
                    c(a);
                  }),
                !1
              );
            });
          }
        },
        {
          key: 'savePersistentStates',
          value: function b(a) {
            this.browser.storage.local.set({ '@@vwe-persistence': a }).catch(function() {
              throw new Error("Vuex WebExtensions: Can't write persistent states to local storage. Did you grant storage permission to your WebExtension?");
            });
          }
        },
        {
          key: 'handleConnection',
          value: function b(a) {
            return this.browser.runtime.onConnect.addListener(a);
          }
        },
        {
          key: 'connectToBackground',
          value: function b(a) {
            return this.browser.runtime.connect({ name: a });
          }
        }
      ]),
      a
    );
  })(),
  _default = Browser;
exports.default = _default;

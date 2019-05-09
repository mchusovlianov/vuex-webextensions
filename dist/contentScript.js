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
 */ var ContentScript = /*#__PURE__*/ (function() {
    function a(b, c, d) {
      var e = this;
      _classCallCheck(this, a),
        (this.store = b),
        (this.browser = c),
        (this.settings = d),
        (this.scriptId = Math.random()
          .toString(36)
          .substr(2, 9)),
        (this.connection = null),
        (this.receivedMutations = []),
        (this.initialized = !1),
        (this.pendingMutations = []),
        (this.connection = c.connectToBackground(''.concat(this.settings.connectionName, '_').concat(this.scriptId))),
        this.connection.onMessage.addListener(function(a) {
          return e.onMessage(a), !0;
        }),
        this.store.subscribe(function(a) {
          e.hookMutation(a);
        });
    }
    return (
      _createClass(a, [
        {
          key: 'onMessage',
          value: function b(a) {
            if (a.type)
              if ('@@STORE_INITIAL_STATE' == a.type) this.store.replaceState(a.data), (this.initialized = !0), this.processPendingMutations();
              else if ('@@STORE_SYNC_MUTATION' == a.type) {
                // Don't commit any mutation from other contexts before the initial state sync
                if (!this.initialized) return;
                this.receivedMutations.push(a.data), this.store.commit(a.data.type, a.data.payload);
              }
          }
        },
        {
          key: 'hookMutation',
          value: function c(a) {
            // If store isn't initialized yet, just enque the mutation to reaply it after sync
            if (!this.initialized) return this.pendingMutations.push(a); // If received mutations list are empty it's own mutation, send to background
            if (!this.receivedMutations.length) return this.sendMutation(a); // Check if it's received mutation, if it's just ignore it, if not send to background
            for (var b = this.receivedMutations.length - 1; 0 <= b; b--)
              this.receivedMutations[b].type == a.type && this.receivedMutations[b].payload == a.payload ? this.receivedMutations.splice(b, 1) : 0 == b && this.sendMutation(a);
          }
        },
        {
          key: 'sendMutation',
          value: function b(a) {
            this.connection.postMessage({ type: '@@STORE_SYNC_MUTATION', data: a });
          }
        },
        {
          key: 'processPendingMutations',
          value: function b() {
            if (this.pendingMutations.length)
              for (
                var a = 0;
                a < this.pendingMutations.length;
                a++ // Clean the pending mutation when are applied
              )
                this.store.commit(this.pendingMutations[a].type, this.pendingMutations[a].payload), this.pendingMutations.splice(a, 1);
          }
        }
      ]),
      a
    );
  })(),
  _default = ContentScript;
exports.default = _default;

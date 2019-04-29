'use strict';
var _utils = require('./utils');
Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.default = void 0);
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
var BackgroundScript = /*#__PURE__*/ (function() {
    function a(b, c, d) {
      var e = this;
      _classCallCheck(this, a),
        (this.store = b),
        (this.browser = c),
        (this.settings = d),
        (this.connections = []),
        this.settings.persistentStates.length &&
          this.browser.getPersistentStates().then(function(a) {
            null !== a && e.store.replaceState(_objectSpread({}, e.store.state, (0, _utils.filterObject)(a, e.settings.persistentStates)));
          }),
        this.store.subscribe(function(a) {
          // Send mutation to connections pool
          for (var b = e.connections.length - 1; 0 <= b; b--) {
            e.connections[b].receivedMutations.length || e.sendMutation(e.connections[b], a); // Check if is one of his mutations
            for (var d = e.connections[b].receivedMutations.length - 1; 0 <= d; d--)
              e.connections[b].receivedMutations[d].type == a.type && e.connections[b].receivedMutations[d].payload == a.payload
                ? e.connections[b].receivedMutations.splice(d, 1)
                : 0 == b && e.sendMutation(e.connections[b], a);
          } // Save persistent states to local storage
          c.savePersistentStates((0, _utils.filterObject)(e.store.state, e.settings.persistentStates));
        }),
        c.handleConnection(function(a) {
          e.onConnection(a);
        });
    }
    return (
      _createClass(a, [
        {
          key: 'onConnection',
          value: function c(a) {
            var b = this;
            a.onDisconnect.addListener(function(a) {
              b.onDisconnect(a);
            }),
              (a.receivedMutations = []),
              a.onMessage.addListener(function(c) {
                b.onMessage(a, c);
              }),
              this.connections.push(a),
              a.postMessage({ type: '@@STORE_INITIAL_STATE', data: this.store.state });
          }
        },
        {
          key: 'onDisconnect',
          value: function c(a) {
            for (var b = this.connections.length - 1; 0 <= b; b--) this.connections[b].name === a.name && this.connections.splice(b, 1);
          }
        },
        {
          key: 'onMessage',
          value: function c(a, b) {
            b.type && '@@STORE_SYNC_MUTATION' === b.type && (a.receivedMutations.push(b.data), this.store.commit(b.data.type, b.data.payload));
          }
        },
        {
          key: 'sendMutation',
          value: function c(a, b) {
            a.postMessage({ type: '@@STORE_SYNC_MUTATION', data: b });
          }
        }
      ]),
      a
    );
  })(),
  _default = BackgroundScript;
exports.default = _default;

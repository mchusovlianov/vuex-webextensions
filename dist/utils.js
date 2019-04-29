'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.filterObject = filterObject);
/*
 *  Copyright 2018 - 2019 Mitsuha Kitsune <https://mitsuhakitsune.com>
 *  Licensed under the MIT license.
 */ function filterObject(a, b) {
  var c = {};
  return (
    b.forEach(function(b) {
      c[b] = a[b];
    }),
    c
  );
}

'use strict';

exports.__esModule = true;

var _aureliaNotify = require('./aurelia-notify');

Object.keys(_aureliaNotify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaNotify[key];
    }
  });
});
define(['exports', './aurelia-notify'], function (exports, _aureliaNotify) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaNotify).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaNotify[key];
      }
    });
  });
});
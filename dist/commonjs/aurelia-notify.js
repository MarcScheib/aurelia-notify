'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bsNotification = require('./bs-notification');

Object.keys(_bsNotification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _bsNotification[key];
    }
  });
});

var _notificationLevel = require('./notification-level');

Object.keys(_notificationLevel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _notificationLevel[key];
    }
  });
});

var _notificationService = require('./notification-service');

Object.keys(_notificationService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _notificationService[key];
    }
  });
});

var _notificationController = require('./notification-controller');

Object.keys(_notificationController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _notificationController[key];
    }
  });
});
exports.configure = configure;

var _notificationRenderer = require('./notification-renderer');

function configure(config, callback) {
  config.globalResources('./bs-notification');

  if (typeof callback === 'function') {
    callback(_notificationRenderer.globalSettings);
  }
}
define(['exports', './bs-notification', './notification-level', './notification-service', './notification-controller', './notification-renderer'], function (exports, _bsNotification, _notificationLevel, _notificationService, _notificationController, _notificationRenderer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_bsNotification).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _bsNotification[key];
      }
    });
  });
  Object.keys(_notificationLevel).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _notificationLevel[key];
      }
    });
  });
  Object.keys(_notificationService).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _notificationService[key];
      }
    });
  });
  Object.keys(_notificationController).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _notificationController[key];
      }
    });
  });
  exports.configure = configure;
  function configure(config, callback) {
    config.globalResources('./bs-notification');

    if (typeof callback === 'function') {
      callback(_notificationRenderer.globalSettings);
    }
  }
});
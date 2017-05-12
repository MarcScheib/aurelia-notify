'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationController = exports.NotificationService = exports.NotificationLevel = exports.BSNotification = undefined;
exports.configure = configure;

var _bsNotification = require('./bs-notification');

Object.defineProperty(exports, 'BSNotification', {
  enumerable: true,
  get: function get() {
    return _bsNotification.BSNotification;
  }
});

var _notificationLevel = require('./notification-level');

Object.defineProperty(exports, 'NotificationLevel', {
  enumerable: true,
  get: function get() {
    return _notificationLevel.NotificationLevel;
  }
});

var _notificationService = require('./notification-service');

Object.defineProperty(exports, 'NotificationService', {
  enumerable: true,
  get: function get() {
    return _notificationService.NotificationService;
  }
});

var _notificationController = require('./notification-controller');

Object.defineProperty(exports, 'NotificationController', {
  enumerable: true,
  get: function get() {
    return _notificationController.NotificationController;
  }
});

var _aureliaPal = require('aurelia-pal');

var _notificationRenderer = require('./notification-renderer');

function configure(config, callback) {
  config.globalResources(_aureliaPal.PLATFORM.moduleName('./bs-notification'));

  if (typeof callback === 'function') {
    callback(_notificationRenderer.globalSettings);
  }
}
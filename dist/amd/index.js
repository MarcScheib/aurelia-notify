define(['exports', './notification-renderer', './bs-notification', './notification-level', './notification-service', './notification-controller'], function (exports, _notificationRenderer, _bsNotification, _notificationLevel, _notificationService, _notificationController) {
  'use strict';

  exports.__esModule = true;
  exports.configure = configure;

  function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  _defaults(exports, _interopExportWildcard(_bsNotification, _defaults));

  _defaults(exports, _interopExportWildcard(_notificationLevel, _defaults));

  _defaults(exports, _interopExportWildcard(_notificationService, _defaults));

  _defaults(exports, _interopExportWildcard(_notificationController, _defaults));

  function configure(config, callback) {
    config.globalResources('./bs-notification');

    if (typeof callback === 'function') {
      callback(_notificationRenderer.globalSettings);
    }
  }
});
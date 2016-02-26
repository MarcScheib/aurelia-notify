System.register(['./notification-renderer', './bs-notification', './notification-level', './notification-service', './notification-controller'], function (_export) {
  'use strict';

  var globalSettings;

  _export('configure', configure);

  function configure(config, callback) {
    config.globalResources('./bs-notification');

    if (typeof callback === 'function') {
      callback(globalSettings);
    }
  }

  return {
    setters: [function (_notificationRenderer) {
      globalSettings = _notificationRenderer.globalSettings;
    }, function (_bsNotification) {
      for (var _key in _bsNotification) {
        if (_key !== 'default') _export(_key, _bsNotification[_key]);
      }
    }, function (_notificationLevel) {
      for (var _key2 in _notificationLevel) {
        if (_key2 !== 'default') _export(_key2, _notificationLevel[_key2]);
      }
    }, function (_notificationService) {
      for (var _key3 in _notificationService) {
        if (_key3 !== 'default') _export(_key3, _notificationService[_key3]);
      }
    }, function (_notificationController) {
      for (var _key4 in _notificationController) {
        if (_key4 !== 'default') _export(_key4, _notificationController[_key4]);
      }
    }],
    execute: function () {}
  };
});
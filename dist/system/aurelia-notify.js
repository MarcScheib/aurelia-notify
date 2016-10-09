'use strict';

System.register(['./notification-renderer', './bs-notification', './notification-level', './notification-service', './notification-controller'], function (_export, _context) {
  "use strict";

  var globalSettings;
  function configure(config, callback) {
    config.globalResources('./bs-notification');

    if (typeof callback === 'function') {
      callback(globalSettings);
    }
  }

  _export('configure', configure);

  return {
    setters: [function (_notificationRenderer) {
      globalSettings = _notificationRenderer.globalSettings;
    }, function (_bsNotification) {
      var _exportObj = {};

      for (var _key in _bsNotification) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _bsNotification[_key];
      }

      _export(_exportObj);
    }, function (_notificationLevel) {
      var _exportObj2 = {};

      for (var _key2 in _notificationLevel) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _notificationLevel[_key2];
      }

      _export(_exportObj2);
    }, function (_notificationService) {
      var _exportObj3 = {};

      for (var _key3 in _notificationService) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _notificationService[_key3];
      }

      _export(_exportObj3);
    }, function (_notificationController) {
      var _exportObj4 = {};

      for (var _key4 in _notificationController) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _notificationController[_key4];
      }

      _export(_exportObj4);
    }],
    execute: function () {}
  };
});
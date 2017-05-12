'use strict';

System.register(['aurelia-pal', './notification-renderer', './bs-notification', './notification-level', './notification-service', './notification-controller'], function (_export, _context) {
  "use strict";

  var PLATFORM, globalSettings;
  function configure(config, callback) {
    config.globalResources(PLATFORM.moduleName('./bs-notification'));

    if (typeof callback === 'function') {
      callback(globalSettings);
    }
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaPal) {
      PLATFORM = _aureliaPal.PLATFORM;
    }, function (_notificationRenderer) {
      globalSettings = _notificationRenderer.globalSettings;
    }, function (_bsNotification) {
      var _exportObj = {};
      _exportObj.BSNotification = _bsNotification.BSNotification;

      _export(_exportObj);
    }, function (_notificationLevel) {
      var _exportObj2 = {};
      _exportObj2.NotificationLevel = _notificationLevel.NotificationLevel;

      _export(_exportObj2);
    }, function (_notificationService) {
      var _exportObj3 = {};
      _exportObj3.NotificationService = _notificationService.NotificationService;

      _export(_exportObj3);
    }, function (_notificationController) {
      var _exportObj4 = {};
      _exportObj4.NotificationController = _notificationController.NotificationController;

      _export(_exportObj4);
    }],
    execute: function () {}
  };
});
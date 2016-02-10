System.register(['./notification-service'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config) {
    config.globalResources('./notifications');
  }

  return {
    setters: [function (_notificationService) {
      for (var _key in _notificationService) {
        if (_key !== 'default') _export(_key, _notificationService[_key]);
      }
    }],
    execute: function () {}
  };
});
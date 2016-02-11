System.register(['./notification-service', './notification'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config) {
    config.globalResources('./notification');
  }

  return {
    setters: [function (_notificationService) {
      for (var _key in _notificationService) {
        if (_key !== 'default') _export(_key, _notificationService[_key]);
      }
    }, function (_notification) {
      for (var _key2 in _notification) {
        if (_key2 !== 'default') _export(_key2, _notification[_key2]);
      }
    }],
    execute: function () {}
  };
});
System.register([], function (_export) {
  'use strict';

  var NotificationLevel;
  return {
    setters: [],
    execute: function () {
      NotificationLevel = {
        info: 'info',
        success: 'success',
        warning: 'warning',
        danger: 'danger'
      };

      _export('NotificationLevel', NotificationLevel);
    }
  };
});
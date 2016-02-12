System.register(['aurelia-framework', './notification-controller'], function (_export) {
  'use strict';

  var inject, NotificationController, BSNotification;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_notificationController) {
      NotificationController = _notificationController.NotificationController;
    }],
    execute: function () {
      BSNotification = (function () {
        function BSNotification(controller) {
          _classCallCheck(this, _BSNotification);

          this.controller = controller;
        }

        BSNotification.prototype.activate = function activate(model) {
          this.level = model.level;
          this.notification = model.notification;
        };

        var _BSNotification = BSNotification;
        BSNotification = inject(NotificationController)(BSNotification) || BSNotification;
        return BSNotification;
      })();

      _export('BSNotification', BSNotification);
    }
  };
});
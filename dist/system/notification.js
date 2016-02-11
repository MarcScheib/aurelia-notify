System.register(['aurelia-framework', './notification-controller'], function (_export) {
  'use strict';

  var inject, NotificationController, Notification;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_notificationController) {
      NotificationController = _notificationController.NotificationController;
    }],
    execute: function () {
      Notification = (function () {
        function Notification(controller) {
          _classCallCheck(this, _Notification);

          this.controller = controller;
        }

        Notification.prototype.activate = function activate(notification) {
          this.notification = notification;
        };

        var _Notification = Notification;
        Notification = inject(NotificationController)(Notification) || Notification;
        return Notification;
      })();

      _export('Notification', Notification);
    }
  };
});
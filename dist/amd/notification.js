define(['exports', 'aurelia-framework', './notification-controller'], function (exports, _aureliaFramework, _notificationController) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Notification = (function () {
    function Notification(controller) {
      _classCallCheck(this, _Notification);

      this.controller = controller;
    }

    Notification.prototype.activate = function activate(notification) {
      this.notification = notification;
    };

    var _Notification = Notification;
    Notification = _aureliaFramework.inject(_notificationController.NotificationController)(Notification) || Notification;
    return Notification;
  })();

  exports.Notification = Notification;
});
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaTemplating = require('aurelia-templating');

var NotificationRenderer = (function () {
  function NotificationRenderer() {
    _classCallCheck(this, NotificationRenderer);

    this.notificationControllers = [];
  }

  NotificationRenderer.prototype.createNotificationHost = function createNotificationHost(notificationController) {
    var _this = this;

    var notificationContainer = document.createElement('notification-container');
    document.body.appendChild(notificationContainer);

    notificationController.slot = new _aureliaTemplating.ViewSlot(notificationContainer, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = function () {
      _this.notificationControllers.push(notificationController);
      notificationController.slot.attached();

      var timeout = 2000;
      if (timeout > 0) {
        setTimeout(notificationController.close.bind(notificationController), timeout);
      }

      return Promise.resolve();
    };

    notificationController.hideNotification = function () {
      var i = _this.notificationControllers.indexOf(notificationController);
      if (i !== -1) {
        _this.notificationControllers.splice(i, 1);
      }

      return Promise.resolve();
    };

    notificationController.destroyNotificationHost = function () {
      document.body.removeChild(notificationContainer);
      notificationController.slot.detached();

      return Promise.resolve();
    };

    return Promise.resolve();
  };

  NotificationRenderer.prototype.showNotification = function showNotification(notificationController) {
    return notificationController.showNotification();
  };

  NotificationRenderer.prototype.hideNotification = function hideNotification(notificationController) {
    return notificationController.hideNotification();
  };

  NotificationRenderer.prototype.destroyNotificationHost = function destroyNotificationHost(notificationController) {
    return notificationController.destroyNotificationHost();
  };

  return NotificationRenderer;
})();

exports.NotificationRenderer = NotificationRenderer;
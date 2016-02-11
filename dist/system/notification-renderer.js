System.register(['aurelia-templating'], function (_export) {
  'use strict';

  var ViewSlot, NotificationRenderer;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaTemplating) {
      ViewSlot = _aureliaTemplating.ViewSlot;
    }],
    execute: function () {
      NotificationRenderer = (function () {
        function NotificationRenderer() {
          _classCallCheck(this, NotificationRenderer);

          this.notificationControllers = [];
        }

        NotificationRenderer.prototype.createNotificationHost = function createNotificationHost(notificationController) {
          var _this = this;

          notificationController.slot = new ViewSlot(document.body, true);
          notificationController.slot.add(notificationController.view);

          notificationController.showNotification = function () {
            _this.notificationControllers.push(notificationController);
            notificationController.slot.attached();
          };

          notificationController.hideNotification = function () {};

          notificationController.destroyNotificationHost = function () {
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
          return notificationController.destroyDialogHost();
        };

        return NotificationRenderer;
      })();

      _export('NotificationRenderer', NotificationRenderer);
    }
  };
});
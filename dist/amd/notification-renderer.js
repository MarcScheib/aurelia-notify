define(['exports', 'aurelia-templating', './bs-notification'], function (exports, _aureliaTemplating, _bsNotification) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var globalSettings = {
    append: false,
    notificationHost: document.body,
    timeout: 0,
    viewModel: _bsNotification.BSNotification
  };

  exports.globalSettings = globalSettings;

  var NotificationRenderer = (function () {
    function NotificationRenderer() {
      _classCallCheck(this, NotificationRenderer);

      this.defaultSettings = globalSettings;

      this.notificationControllers = [];
    }

    NotificationRenderer.prototype.createNotificationHost = function createNotificationHost(notificationController) {
      var _this = this;

      var settings = notificationController.settings;
      var notificationContainer = document.createElement('notification-container');
      var notificationHost = settings.notificationHost;

      if (settings.append === true) {
        notificationHost.appendChild(notificationContainer);
      } else {
        notificationHost.insertBefore(notificationContainer, settings.notificationHost.firstChild);
      }

      notificationController.slot = new _aureliaTemplating.ViewSlot(notificationContainer, true);
      notificationController.slot.add(notificationController.view);

      notificationController.showNotification = function () {
        _this.notificationControllers.push(notificationController);
        notificationController.slot.attached();

        var timeout = settings.timeout;
        if (timeout > 0) {
          notificationController.timer = setTimeout(notificationController.close.bind(notificationController), timeout);
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
        settings.notificationHost.removeChild(notificationContainer);
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
});
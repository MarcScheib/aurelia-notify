'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationRenderer = exports.globalSettings = undefined;

var _aureliaTemplating = require('aurelia-templating');

var _bsNotification = require('./bs-notification');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var globalSettings = exports.globalSettings = {
  append: false,
  containerSelector: 'body',
  timeout: 0,
  viewModel: _bsNotification.BSNotification,
  limit: 5
};

var transitionEvent = function () {
  var transition = null;

  return function () {
    if (transition) return transition;

    var t = void 0;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        transition = transitions[t];
        return transition;
      }
    }

    return undefined;
  };
}();

var NotificationRenderer = exports.NotificationRenderer = function () {
  function NotificationRenderer() {
    _classCallCheck(this, NotificationRenderer);

    this.defaultSettings = globalSettings;

    this.notificationControllers = [];
  }

  NotificationRenderer.prototype.createNotificationHost = function createNotificationHost(notificationController) {
    var _this = this;

    var settings = notificationController.settings;
    var notificationHost = document.createElement('notification-host');
    var notificationContainer = this.getNotificationContainer(settings.containerSelector);

    if (settings.append === true) {
      notificationContainer.appendChild(notificationHost);
    } else {
      notificationContainer.insertBefore(notificationHost, notificationContainer.firstChild);
    }

    notificationController.slot = new _aureliaTemplating.ViewSlot(notificationHost, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = function () {
      _this.notificationControllers.push(notificationController);

      if (_this.notificationControllers.length >= settings.limit + 1) {
        _this.notificationControllers[0].close(_this.notificationControllers[0]);
      }

      notificationController.slot.attached();

      if (settings.timeout > 0) {
        notificationController.timer = setTimeout(notificationController.close.bind(notificationController), settings.timeout);
      }

      return new Promise(function (resolve) {
        function onTransitionEnd(e) {
          if (e.target !== notificationHost) {
            return;
          }
          notificationHost.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }

        notificationHost.addEventListener(transitionEvent(), onTransitionEnd);
        setTimeout(function () {
          notificationHost.classList.add('notification-host-active');
        }, 0);
      });
    };

    notificationController.hideNotification = function () {
      var i = _this.notificationControllers.indexOf(notificationController);
      if (i !== -1) {
        _this.notificationControllers.splice(i, 1);
      }

      return new Promise(function (resolve) {
        function onTransitionEnd() {
          notificationHost.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }

        notificationHost.addEventListener(transitionEvent(), onTransitionEnd);
        notificationHost.classList.remove('notification-host-active');
      });
    };

    notificationController.destroyNotificationHost = function () {
      notificationContainer.removeChild(notificationHost);
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

  NotificationRenderer.prototype.getNotificationContainer = function getNotificationContainer(containerSelector) {
    var notificationContainer = document.querySelector(containerSelector);
    if (notificationContainer === null) {
      notificationContainer = document.body;
    }

    return notificationContainer;
  };

  return NotificationRenderer;
}();
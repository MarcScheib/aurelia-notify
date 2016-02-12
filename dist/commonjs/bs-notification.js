'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaFramework = require('aurelia-framework');

var _notificationController = require('./notification-controller');

var BSNotification = (function () {
  function BSNotification(controller) {
    _classCallCheck(this, _BSNotification);

    this.controller = controller;
  }

  BSNotification.prototype.activate = function activate(model) {
    this.level = model.level;
    this.notification = model.notification;
  };

  var _BSNotification = BSNotification;
  BSNotification = _aureliaFramework.inject(_notificationController.NotificationController)(BSNotification) || BSNotification;
  return BSNotification;
})();

exports.BSNotification = BSNotification;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BSNotification = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _notificationController = require('./notification-controller');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BSNotification = exports.BSNotification = (_dec = (0, _aureliaFramework.inject)(_notificationController.NotificationController), _dec(_class = function () {
  function BSNotification(controller) {
    _classCallCheck(this, BSNotification);

    this.controller = controller;
  }

  BSNotification.prototype.activate = function activate(model) {
    this.level = model.level;
    this.notification = model.notification;
  };

  return BSNotification;
}()) || _class);
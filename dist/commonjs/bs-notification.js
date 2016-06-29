'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BSNotification = undefined;

var _class, _temp;

var _notificationController = require('./notification-controller');



var BSNotification = exports.BSNotification = (_temp = _class = function () {
  function BSNotification(controller) {
    

    this.controller = controller;
  }

  BSNotification.prototype.activate = function activate(model) {
    this.level = model.level;
    this.notification = model.notification;
  };

  return BSNotification;
}(), _class.inject = [_notificationController.NotificationController], _temp);
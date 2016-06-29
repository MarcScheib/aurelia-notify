var _class, _temp;



import { NotificationController } from './notification-controller';

export var BSNotification = (_temp = _class = function () {
  function BSNotification(controller) {
    

    this.controller = controller;
  }

  BSNotification.prototype.activate = function activate(model) {
    this.level = model.level;
    this.notification = model.notification;
  };

  return BSNotification;
}(), _class.inject = [NotificationController], _temp);
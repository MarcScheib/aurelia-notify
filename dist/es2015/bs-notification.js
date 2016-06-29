var _class, _temp;

import { NotificationController } from './notification-controller';

export let BSNotification = (_temp = _class = class BSNotification {

  constructor(controller) {
    this.controller = controller;
  }

  activate(model) {
    this.level = model.level;
    this.notification = model.notification;
  }
}, _class.inject = [NotificationController], _temp);
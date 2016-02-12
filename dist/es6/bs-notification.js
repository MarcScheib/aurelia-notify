import {inject} from 'aurelia-framework';

import {NotificationController} from './notification-controller';

@inject(NotificationController)
export class BSNotification {
  constructor(controller) {
    this.controller = controller;
  }

  activate(model) {
    this.level = model.level;
    this.notification = model.notification;
  }
}

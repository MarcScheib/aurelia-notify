import {NotificationController} from './notification-controller';

export class BSNotification {
  static inject = [NotificationController];

  constructor(controller: NotificationController) {
    this.controller = controller;
  }

  activate(model: any) {
    this.level = model.level;
    this.notification = model.notification;
  }
}

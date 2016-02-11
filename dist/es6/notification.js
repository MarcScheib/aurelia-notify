import {inject} from 'aurelia-framework';

import {NotificationController} from './notification-controller';

@inject(NotificationController)
export class Notification {
  constructor(controller) {
    this.controller = controller;
  }

  activate(notification) {
    this.notification = notification;
  }
}

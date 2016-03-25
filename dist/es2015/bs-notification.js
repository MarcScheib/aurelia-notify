var _dec, _class;

import { inject } from 'aurelia-framework';

import { NotificationController } from './notification-controller';

export let BSNotification = (_dec = inject(NotificationController), _dec(_class = class BSNotification {
  constructor(controller) {
    this.controller = controller;
  }

  activate(model) {
    this.level = model.level;
    this.notification = model.notification;
  }
}) || _class);
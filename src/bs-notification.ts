import { NotificationController } from './notification-controller';

export class BSNotification {
  public static inject = [NotificationController];

  public controller: NotificationController;
  public level: any;
  public notification: any;

  constructor(controller: NotificationController) {
    this.controller = controller;
  }

  public activate(model: any): void {
    this.level = model.level;
    this.notification = model.notification;
  }
}

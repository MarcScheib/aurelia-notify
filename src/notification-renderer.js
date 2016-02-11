import {ViewSlot} from 'aurelia-templating';

export class NotificationRenderer {
  constructor() {
    this.notificationControllers = [];
  }

  createNotificationHost(notificationController) {
    notificationController.slot = new ViewSlot(document.body, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = () => {
      this.notificationControllers.push(notificationController);
      notificationController.slot.attached();
    };

    notificationController.hideNotification = () => {
    };

    notificationController.destroyNotificationHost = () => {
      notificationController.slot.detached();
      return Promise.resolve();
    };

    return Promise.resolve();
  }

  showNotification(notificationController) {
    return notificationController.showNotification();
  }

  hideNotification(notificationController) {
    return notificationController.hideNotification();
  }

  destroyNotificationHost(notificationController) {
    return notificationController.destroyDialogHost();
  }
}

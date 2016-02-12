import {ViewSlot} from 'aurelia-templating';

export class NotificationRenderer {
  constructor() {
    this.notificationControllers = [];
  }

  createNotificationHost(notificationController) {
    let notificationContainer = document.createElement('notification-container');
    document.body.appendChild(notificationContainer);

    notificationController.slot = new ViewSlot(notificationContainer, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = () => {
      this.notificationControllers.push(notificationController);
      notificationController.slot.attached();

      return Promise.resolve();
    };

    notificationController.hideNotification = () => {
      let i = this.notificationControllers.indexOf(notificationController);
      if (i !== -1) {
        this.notificationControllers.splice(i, 1);
      }

      return Promise.resolve();
    };

    notificationController.destroyNotificationHost = () => {
      document.body.removeChild(notificationContainer);
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
    return notificationController.destroyNotificationHost();
  }
}

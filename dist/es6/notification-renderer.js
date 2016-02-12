import {ViewSlot} from 'aurelia-templating';

export let globalSettings = {
  notificationHost: document.body,
  timeout: 10000
};

export class NotificationRenderer {
  defaultSettings = globalSettings;

  constructor() {
    this.notificationControllers = [];
  }

  createNotificationHost(notificationController) {
    let settings = notificationController.settings;
    let notificationContainer = document.createElement('notification-container');

    settings.notificationHost.appendChild(notificationContainer);

    notificationController.slot = new ViewSlot(notificationContainer, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = () => {
      this.notificationControllers.push(notificationController);
      notificationController.slot.attached();

      let timeout = settings.timeout;
      if (timeout > 0) {
        setTimeout(notificationController.close.bind(notificationController), timeout);
      }

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
      settings.notificationHost.removeChild(notificationContainer);
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

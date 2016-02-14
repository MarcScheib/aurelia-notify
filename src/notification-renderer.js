import {ViewSlot} from 'aurelia-templating';

import {BSNotification} from './bs-notification';

export let globalSettings = {
  append: false,
  notificationHost: document.body,
  timeout: 0,
  viewModel: BSNotification
};

export class NotificationRenderer {
  defaultSettings = globalSettings;

  constructor() {
    this.notificationControllers = [];
  }

  createNotificationHost(notificationController) {
    let settings = notificationController.settings;
    let notificationContainer = document.createElement('notification-container');
    let notificationHost = settings.notificationHost;

    if (settings.append === true) {
      notificationHost.appendChild(notificationContainer);
    } else {
      notificationHost.insertBefore(notificationContainer, settings.notificationHost.firstChild);
    }

    notificationController.slot = new ViewSlot(notificationContainer, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = () => {
      this.notificationControllers.push(notificationController);
      notificationController.slot.attached();

      let timeout = settings.timeout;
      if (timeout > 0) {
        notificationController.timer = setTimeout(notificationController.close.bind(notificationController), timeout);
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

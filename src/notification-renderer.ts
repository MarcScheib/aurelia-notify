import { DOM } from 'aurelia-pal';
import { ViewSlot } from 'aurelia-templating';

import { BSNotification } from './bs-notification';
import { NotificationController } from './notification-controller';

export let globalSettings = {
  append: false,
  containerSelector: 'body',
  timeout: 0,
  viewModel: BSNotification,
  limit: 5
};

const transitionEvent = (() => {
  let transition: string | undefined;
  return (): string => {
    if (transition) {
      return transition;
    }

    let t;
    const el: HTMLElement = DOM.createElement('fakeelement') as HTMLElement;
    const transitions: { [key: string]: string; } = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };
    for (t in transitions) {
      if ((el.style as any)[t] !== undefined) {
        transition = transitions[t];
        return transition;
      }
    }

    return '';
  };
})();

export class NotificationRenderer {
  private notificationControllers: NotificationController[];

  public defaultSettings = globalSettings;

  constructor() {
    this.notificationControllers = [];
  }

  public createNotificationHost(notificationController: NotificationController) {
    const settings = notificationController.settings;
    const notificationHost = DOM.createElement('notification-host');
    const notificationContainer = this.getNotificationContainer(settings.containerSelector);

    if (settings.append === true) {
      notificationContainer.appendChild(notificationHost);
    } else {
      notificationContainer.insertBefore(notificationHost, notificationContainer.firstChild);
    }

    notificationController.slot = new ViewSlot(notificationHost, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = () => {
      this.notificationControllers.push(notificationController);

      if (this.notificationControllers.length >= (settings.limit + 1)) {
        this.notificationControllers[0].close();
      }

      notificationController.slot.attached();

      if (settings.timeout > 0) {
        // tslint:disable-next-line:max-line-length
        notificationController.timer = setTimeout(notificationController.close.bind(notificationController), settings.timeout);
      }

      return new Promise((resolve: any) => {
        function onTransitionEnd(e: TransitionEvent) {
          if (e.target !== notificationHost) {
            return;
          }
          notificationHost.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }

        notificationHost.addEventListener(transitionEvent(), onTransitionEnd);
        setTimeout(() => {
          notificationHost.classList.add('notification-host-active');
        }, 0);
      });
    };

    notificationController.hideNotification = () => {
      const i = this.notificationControllers.indexOf(notificationController);
      if (i !== -1) {
        this.notificationControllers.splice(i, 1);
      }

      return new Promise((resolve: any) => {
        function onTransitionEnd() {
          notificationHost.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }

        notificationHost.addEventListener(transitionEvent(), onTransitionEnd);
        notificationHost.classList.remove('notification-host-active');
      });
    };

    notificationController.destroyNotificationHost = () => {
      notificationContainer.removeChild(notificationHost);
      notificationController.slot.detached();

      return Promise.resolve();
    };

    return Promise.resolve();
  }

  public showNotification(notificationController: NotificationController) {
    return notificationController.showNotification();
  }

  public hideNotification(notificationController: NotificationController) {
    return notificationController.hideNotification();
  }

  public destroyNotificationHost(notificationController: NotificationController) {
    return notificationController.destroyNotificationHost();
  }

  public getNotificationContainer(containerSelector: string) {
    let notificationContainer = DOM.querySelectorAll(containerSelector);
    if (notificationContainer === null) {
      notificationContainer = DOM.querySelectorAll('body');
    }

    return notificationContainer[0];
  }
}

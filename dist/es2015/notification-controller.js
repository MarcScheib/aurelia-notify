import { invokeLifecycle } from './lifecycle';

export let NotificationController = class NotificationController {
  constructor(renderer, settings) {
    this.renderer = renderer;
    this.settings = settings;
  }

  close() {
    clearTimeout(this.timer);

    return invokeLifecycle(this.viewModel, 'canDeactivate').then(canDeactivate => {
      if (canDeactivate) {
        invokeLifecycle(this.viewModel, 'deactivate').then(() => {
          return this.renderer.hideNotification(this);
        }).then(() => {
          return this.renderer.destroyNotificationHost(this);
        }).then(() => {
          this.controller.unbind();
        });
      }
    });
  }
};
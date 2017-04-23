import { invokeLifecycle } from './lifecycle';

export let NotificationController = class NotificationController {
  constructor(renderer, settings) {
    this.renderer = renderer;
    this.settings = settings;
  }

  close() {
    if (this.closePromise) {
      return this.closePromise;
    }
    clearTimeout(this.timer);
    return this.closePromise = invokeLifecycle(this.viewModel, 'canDeactivate').then(canDeactivate => {
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
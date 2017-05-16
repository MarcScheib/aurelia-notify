import {invokeLifecycle} from './lifecycle';

export class NotificationController {
  constructor(renderer: NotificationRenderer, settings: any) {
    this.renderer = renderer;
    this.settings = settings;
  }

  close() {
    if (this.closePromise) {
      return this.closePromise;
    }
    clearTimeout(this.timer);
    return this.closePromise = invokeLifecycle(this.viewModel, 'canDeactivate')
      .then(canDeactivate => {
        if (canDeactivate) {
          return invokeLifecycle(this.viewModel, 'deactivate')
            .then(() => {
              return this.renderer.hideNotification(this);
            })
            .then(() => {
              return this.renderer.destroyNotificationHost(this);
            })
            .then(() => {
              this.controller.unbind();
            });
        }
      });
  }
}

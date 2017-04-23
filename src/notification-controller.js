import {invokeLifecycle} from './lifecycle';

export class NotificationController {
  constructor(renderer: NotificationRenderer, settings: any) {
    this.renderer = renderer;
    this.settings = settings;
  }

  close() {
    clearTimeout(this.timer);

    return invokeLifecycle(this.viewModel, 'canDeactivate')
      .then(canDeactivate => {
        if (canDeactivate) {
          invokeLifecycle(this.viewModel, 'deactivate')
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

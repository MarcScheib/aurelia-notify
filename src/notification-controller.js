import {invokeLifecycle} from './lifecycle';

export class NotificationController {
  constructor(renderer, settings, resolve, reject) {
    this._renderer = renderer;
    this.settings = settings;
    this._resolve = resolve;
    this._reject = reject;
  }

  close() {
    clearTimeout(this.timer);

    return invokeLifecycle(this.viewModel, 'canDeactivate').then(canDeactivate => {
      if (canDeactivate) {
        return invokeLifecycle(this.viewModel, 'deactivate').then(() => {
          return this._renderer.hideNotification(this).then(() => {
            return this._renderer.destroyNotificationHost(this).then(() => {
              this.controller.unbind();
              this._resolve();
            });
          });
        });
      }
    });
  }
}

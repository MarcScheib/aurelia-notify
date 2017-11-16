import { Controller, View, ViewSlot } from 'aurelia-templating';

import { invokeLifecycle } from './lifecycle';
import { NotificationRenderer } from './notification-renderer';

export class NotificationController {
  public closePromise: Promise<any> | undefined;

  public slot: ViewSlot;
  public viewModel: any;
  public controller: Controller;
  public view: View;

  public renderer: NotificationRenderer;
  public settings: any;
  public showNotification: () => Promise<any>;
  public hideNotification: () => Promise<any>;
  public destroyNotificationHost: () => Promise<void>;
  public timer: number;

  constructor(renderer: NotificationRenderer, settings: any) {
    this.renderer = renderer;
    this.settings = settings;
  }

  public close(): Promise<void> {
    if (this.closePromise) {
      return this.closePromise;
    }

    clearTimeout(this.timer);
    return this.closePromise = invokeLifecycle(this.viewModel, 'canDeactivate')
      .catch(reason => {
        this.closePromise = undefined;
        return Promise.reject(reason);
      })
      .then((canDeactivate: any) => {
        if (!canDeactivate) {
          this.closePromise = undefined; // we are done, do not block consecutive calls
          throw new Error('Operation cancelled.');
        }

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
      });
  }
}

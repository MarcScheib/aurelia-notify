

import { invokeLifecycle } from './lifecycle';

export var NotificationController = function () {
  function NotificationController(renderer, settings) {
    

    this.renderer = renderer;
    this.settings = settings;
  }

  NotificationController.prototype.close = function close() {
    var _this = this;

    if (this.closePromise) {
      return this.closePromise;
    }
    clearTimeout(this.timer);
    return this.closePromise = invokeLifecycle(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
      if (canDeactivate) {
        invokeLifecycle(_this.viewModel, 'deactivate').then(function () {
          return _this.renderer.hideNotification(_this);
        }).then(function () {
          return _this.renderer.destroyNotificationHost(_this);
        }).then(function () {
          _this.controller.unbind();
        });
      }
    });
  };

  return NotificationController;
}();
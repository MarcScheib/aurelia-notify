'use strict';

exports.__esModule = true;
exports.NotificationController = undefined;

var _lifecycle = require('./lifecycle');



var NotificationController = exports.NotificationController = function () {
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
    return this.closePromise = (0, _lifecycle.invokeLifecycle)(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
      if (canDeactivate) {
        (0, _lifecycle.invokeLifecycle)(_this.viewModel, 'deactivate').then(function () {
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
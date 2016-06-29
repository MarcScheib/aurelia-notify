define(['exports', './lifecycle'], function (exports, _lifecycle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NotificationController = undefined;

  

  var NotificationController = exports.NotificationController = function () {
    function NotificationController(renderer, settings) {
      

      this._renderer = renderer;
      this.settings = settings;
    }

    NotificationController.prototype.close = function close() {
      var _this = this;

      clearTimeout(this.timer);

      return (0, _lifecycle.invokeLifecycle)(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
        if (canDeactivate) {
          (0, _lifecycle.invokeLifecycle)(_this.viewModel, 'deactivate').then(function () {
            return _this._renderer.hideNotification(_this);
          }).then(function () {
            return _this._renderer.destroyNotificationHost(_this);
          }).then(function () {
            _this.controller.unbind();
          });
        }
      });
    };

    return NotificationController;
  }();
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationController = undefined;

var _lifecycle = require('./lifecycle');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationController = exports.NotificationController = function () {
  function NotificationController(renderer, settings) {
    _classCallCheck(this, NotificationController);

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
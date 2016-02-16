define(['exports', './lifecycle'], function (exports, _lifecycle) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var NotificationController = (function () {
    function NotificationController(renderer, settings) {
      _classCallCheck(this, NotificationController);

      this._renderer = renderer;
      this.settings = settings;
    }

    NotificationController.prototype.close = function close() {
      var _this = this;

      clearTimeout(this.timer);

      return _lifecycle.invokeLifecycle(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
        if (canDeactivate) {
          return _lifecycle.invokeLifecycle(_this.viewModel, 'deactivate');
        }
      }).then(function () {
        return _this._renderer.hideNotification(_this);
      }).then(function () {
        return _this._renderer.destroyNotificationHost(_this);
      }).then(function () {
        _this.controller.unbind();
      });
    };

    return NotificationController;
  })();

  exports.NotificationController = NotificationController;
});
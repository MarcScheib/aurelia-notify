System.register(['./lifecycle'], function (_export) {
  'use strict';

  var invokeLifecycle, NotificationController;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_lifecycle) {
      invokeLifecycle = _lifecycle.invokeLifecycle;
    }],
    execute: function () {
      NotificationController = (function () {
        function NotificationController(renderer, settings, resolve, reject) {
          _classCallCheck(this, NotificationController);

          this._renderer = renderer;
          this.settings = settings;
          this._resolve = resolve;
          this._reject = reject;
        }

        NotificationController.prototype.close = function close() {
          var _this = this;

          clearTimeout(this.timer);

          return invokeLifecycle(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
            if (canDeactivate) {
              return invokeLifecycle(_this.viewModel, 'deactivate').then(function () {
                return _this._renderer.hideNotification(_this).then(function () {
                  return _this._renderer.destroyNotificationHost(_this).then(function () {
                    _this.controller.unbind();
                    _this._resolve();
                  });
                });
              });
            }
          });
        };

        return NotificationController;
      })();

      _export('NotificationController', NotificationController);
    }
  };
});
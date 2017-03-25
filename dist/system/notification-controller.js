'use strict';

System.register(['./lifecycle'], function (_export, _context) {
  "use strict";

  var invokeLifecycle, NotificationController;

  

  return {
    setters: [function (_lifecycle) {
      invokeLifecycle = _lifecycle.invokeLifecycle;
    }],
    execute: function () {
      _export('NotificationController', NotificationController = function () {
        function NotificationController(renderer, settings) {
          

          this.renderer = renderer;
          this.settings = settings;
        }

        NotificationController.prototype.close = function close() {
          var _this = this;

          clearTimeout(this.timer);

          return invokeLifecycle(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
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
      }());

      _export('NotificationController', NotificationController);
    }
  };
});
define(["require", "exports", "./lifecycle"], function (require, exports, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotificationController = /** @class */ (function () {
        function NotificationController(renderer, settings) {
            this.renderer = renderer;
            this.settings = settings;
        }
        NotificationController.prototype.close = function () {
            var _this = this;
            if (this.closePromise) {
                return this.closePromise;
            }
            clearTimeout(this.timer);
            return this.closePromise = lifecycle_1.invokeLifecycle(this.viewModel, 'canDeactivate')
                .catch(function (reason) {
                _this.closePromise = undefined;
                return Promise.reject(reason);
            })
                .then(function (canDeactivate) {
                if (!canDeactivate) {
                    _this.closePromise = undefined; // we are done, do not block consecutive calls
                    throw new Error('Operation cancelled.');
                }
                return lifecycle_1.invokeLifecycle(_this.viewModel, 'deactivate')
                    .then(function () {
                    return _this.renderer.hideNotification(_this);
                })
                    .then(function () {
                    return _this.renderer.destroyNotificationHost(_this);
                })
                    .then(function () {
                    _this.controller.unbind();
                });
            });
        };
        return NotificationController;
    }());
    exports.NotificationController = NotificationController;
});

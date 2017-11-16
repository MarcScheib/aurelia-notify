define(["require", "exports", "./notification-controller"], function (require, exports, notification_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BSNotification = /** @class */ (function () {
        function BSNotification(controller) {
            this.controller = controller;
        }
        BSNotification.prototype.activate = function (model) {
            this.level = model.level;
            this.notification = model.notification;
        };
        BSNotification.inject = [notification_controller_1.NotificationController];
        return BSNotification;
    }());
    exports.BSNotification = BSNotification;
});

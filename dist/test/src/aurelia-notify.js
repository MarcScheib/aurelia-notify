define(["require", "exports", "aurelia-pal", "./notification-renderer", "./bs-notification", "./notification-level", "./notification-service", "./notification-controller"], function (require, exports, aurelia_pal_1, notification_renderer_1, bs_notification_1, notification_level_1, notification_service_1, notification_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(frameworkConfig, callback) {
        frameworkConfig.globalResources(aurelia_pal_1.PLATFORM.moduleName('./bs-notification'));
        if (typeof callback === 'function') {
            callback(notification_renderer_1.globalSettings);
        }
    }
    exports.configure = configure;
    exports.BSNotification = bs_notification_1.BSNotification;
    exports.NotificationLevel = notification_level_1.NotificationLevel;
    exports.NotificationService = notification_service_1.NotificationService;
    exports.NotificationController = notification_controller_1.NotificationController;
});

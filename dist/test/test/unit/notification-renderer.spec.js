define(["require", "exports", "../../src/notification-controller", "../../src/notification-renderer", "../../src/bs-notification"], function (require, exports, notification_controller_1, notification_renderer_1, bs_notification_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultSettings = {
        append: false,
        containerSelector: 'body',
        timeout: 0,
        viewModel: bs_notification_1.BSNotification,
        limit: 5
    };
    describe('the Notification Renderer', function () {
        var sut;
        var controller;
        it('uses the default settings', function (done) {
            sut = new notification_renderer_1.NotificationRenderer();
            expect(sut.defaultSettings).toEqual(exports.defaultSettings);
            done();
        });
        xit('calls the corresponding controller methods', function (done) {
            sut = new notification_renderer_1.NotificationRenderer();
            controller = new notification_controller_1.NotificationController(sut, exports.defaultSettings);
            sut.createNotificationHost(controller);
            spyOn(controller, 'showNotification');
            spyOn(controller, 'hideNotification');
            spyOn(controller, 'destroyNotificationHost');
            sut.showNotification(controller);
            expect(controller.showNotification).toHaveBeenCalled();
            expect(controller.hideNotification).toHaveBeenCalled();
            expect(controller.destroyNotificationHost).toHaveBeenCalled();
            done();
        });
    });
});

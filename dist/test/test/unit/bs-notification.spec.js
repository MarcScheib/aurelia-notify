define(["require", "exports", "../../src/bs-notification", "../../src/notification-controller", "../../src/notification-renderer"], function (require, exports, bs_notification_1, notification_controller_1, notification_renderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('the BSNotification View Model', function () {
        var renderer;
        var controller;
        var sut;
        beforeEach(function () {
            renderer = new notification_renderer_1.NotificationRenderer();
            controller = new notification_controller_1.NotificationController(renderer, {});
            sut = new bs_notification_1.BSNotification(controller);
        });
        it('should hold the controller', function () {
            expect(sut.controller).toEqual(controller);
        });
        it('should save the message and info on activation', function () {
            var model = {
                level: 'info',
                notification: 'message'
            };
            sut.activate(model);
            expect(sut.level).toEqual(model.level);
            expect(sut.notification).toEqual(model.notification);
        });
    });
});

define(["require", "exports", "../../src/notification-controller", "../../src/notification-renderer"], function (require, exports, notification_controller_1, notification_renderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('the Notification Controller', function () {
        var renderer;
        var settings;
        var sut;
        beforeEach(function () {
            renderer = new notification_renderer_1.NotificationRenderer();
            settings = { name: 'Notification' };
            sut = new notification_controller_1.NotificationController(renderer, settings);
        });
        it('should be created with a settings property', function () {
            expect(sut.settings).toEqual(settings);
        });
    });
});

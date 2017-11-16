define(["require", "exports", "../../src/notification-service", "../../src/notification-renderer", "aurelia-dependency-injection", "aurelia-templating"], function (require, exports, notification_service_1, notification_renderer_1, aurelia_dependency_injection_1, aurelia_templating_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('the Notification Service', function () {
        var compositionEngine;
        var container;
        var renderer;
        var sut;
        beforeEach(function () {
            container = new aurelia_dependency_injection_1.Container();
            compositionEngine = container.get(aurelia_templating_1.CompositionEngine);
            renderer = new notification_renderer_1.NotificationRenderer();
            sut = new notification_service_1.NotificationService(compositionEngine, container, renderer);
        });
        it('should show a notification', function () {
            var result = sut.notify('Message');
            result.then(function (result) {
                spyOn(result.renderer, 'createNotificationHost');
                spyOn(result.renderer, 'showNotification');
                expect(result.renderer.createNotificationHost).toHaveBeenCalled();
                expect(result.renderer.showNotification).toHaveBeenCalled();
            });
        });
    });
});

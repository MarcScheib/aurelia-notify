define(["require", "exports", "../../src/notification-level"], function (require, exports, notification_level_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('the notification levels', function () {
        it('should define info, success, warning, and danger levels', function () {
            expect(notification_level_1.NotificationLevel.info).toEqual('info');
            expect(notification_level_1.NotificationLevel.success).toEqual('success');
            expect(notification_level_1.NotificationLevel.warning).toEqual('warning');
            expect(notification_level_1.NotificationLevel.danger).toEqual('danger');
        });
    });
});

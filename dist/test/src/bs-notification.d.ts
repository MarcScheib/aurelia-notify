import { NotificationController } from './notification-controller';
export declare class BSNotification {
    static inject: (typeof NotificationController)[];
    controller: NotificationController;
    level: any;
    notification: any;
    constructor(controller: NotificationController);
    activate(model: any): void;
}

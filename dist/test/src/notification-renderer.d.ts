import { BSNotification } from './bs-notification';
import { NotificationController } from './notification-controller';
export declare let globalSettings: {
    append: boolean;
    containerSelector: string;
    timeout: number;
    viewModel: typeof BSNotification;
    limit: number;
};
export declare class NotificationRenderer {
    private notificationControllers;
    defaultSettings: {
        append: boolean;
        containerSelector: string;
        timeout: number;
        viewModel: typeof BSNotification;
        limit: number;
    };
    constructor();
    createNotificationHost(notificationController: NotificationController): Promise<void>;
    showNotification(notificationController: NotificationController): Promise<any>;
    hideNotification(notificationController: NotificationController): Promise<any>;
    destroyNotificationHost(notificationController: NotificationController): Promise<void>;
    getNotificationContainer(containerSelector: string): Node;
}

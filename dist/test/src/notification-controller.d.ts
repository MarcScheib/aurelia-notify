import { Controller, View, ViewSlot } from 'aurelia-templating';
import { NotificationRenderer } from './notification-renderer';
export declare class NotificationController {
    closePromise: Promise<any> | undefined;
    slot: ViewSlot;
    viewModel: any;
    controller: Controller;
    view: View;
    renderer: NotificationRenderer;
    settings: any;
    showNotification: () => Promise<any>;
    hideNotification: () => Promise<any>;
    destroyNotificationHost: () => Promise<void>;
    timer: number;
    constructor(renderer: NotificationRenderer, settings: any);
    close(): Promise<void>;
}

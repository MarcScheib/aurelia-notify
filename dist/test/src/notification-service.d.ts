import { Container } from 'aurelia-dependency-injection';
import { CompositionEngine } from 'aurelia-templating';
import { NotificationRenderer } from './notification-renderer';
export declare class NotificationService {
    private compositionEngine;
    private container;
    private notificationRenderer;
    static inject: (typeof Container | typeof CompositionEngine | typeof NotificationRenderer)[];
    constructor(compositionEngine: CompositionEngine, container: Container, notificationRenderer: NotificationRenderer);
    notify(model: any, settings?: any, level?: string): any;
    info(message: string, settings?: any): any;
    success(message: string, settings?: any): any;
    warning(message: string, settings?: any): any;
    danger(message: string, settings?: any): any;
}

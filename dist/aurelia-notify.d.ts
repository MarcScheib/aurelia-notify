import {
  DOM
} from 'aurelia-pal';
import {
  ViewSlot,
  CompositionEngine
} from 'aurelia-templating';
import {
  Container
} from 'aurelia-dependency-injection';
import {
  Origin
} from 'aurelia-metadata';
export declare let NotificationLevel: any;
export declare function invokeLifecycle(instance: any, name: string, model: any): any;
export declare class NotificationController {
  constructor(renderer: NotificationRenderer, settings: any);
  close(): any;
}
export declare class BSNotification {
  static inject: any;
  constructor(controller: NotificationController);
  activate(model: any): any;
}
export declare let globalSettings: any;
export declare class NotificationRenderer {
  defaultSettings: any;
  constructor();
  createNotificationHost(notificationController?: any): any;
  showNotification(notificationController?: any): any;
  hideNotification(notificationController?: any): any;
  destroyNotificationHost(notificationController?: any): any;
  getNotificationContainer(containerSelector?: any): any;
}
export declare class NotificationService {
  static inject: any;
  compositionEngine: CompositionEngine;
  container: Container;
  notificationRenderer: NotificationRenderer;
  constructor(compositionEngine: CompositionEngine, container: Container, notificationRenderer: NotificationRenderer);
  notify(model: any, settings?: any, level?: string): any;
  info(message: string, settings?: any): any;
  success(message: string, settings?: any): any;
  warning(message: string, settings?: any): any;
  danger(message: string, settings?: any): any;
}
declare module 'aurelia-notify' {
  import {
    inject
  } from 'aurelia-framework';
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
  export class BSNotification {
    constructor(controller: NotificationController);
    activate(model: any): any;
  }
  export function invokeLifecycle(instance: any, name: string, model: any): any;
  export class NotificationController {
    constructor(renderer: NotificationRenderer, settings: any);
    close(): any;
  }
  export let NotificationLevel: any;
  export let globalSettings: any;
  export class NotificationRenderer {
    defaultSettings: any;
    constructor();
    createNotificationHost(notificationController: NotificationController): any;
    showNotification(notificationController: NotificationController): any;
    hideNotification(notificationController: NotificationController): any;
    destroyNotificationHost(notificationController: NotificationController): any;
    getNotificationContainer(containerSelector: string): any;
  }
  export class NotificationService {
    constructor(compositionEngine: CompositionEngine, container: Container, notificationRenderer: NotificationRenderer);
    notify(message: string, settings?: any, level?: string): any;
    info(message: string, settings?: any): any;
    success(message: string, settings?: any): any;
    warning(message: string, settings?: any): any;
    danger(message: string, settings?: any): any;
  }
}
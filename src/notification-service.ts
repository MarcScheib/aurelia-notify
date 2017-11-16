import { Container } from 'aurelia-dependency-injection';
import { Origin } from 'aurelia-metadata';
import { CompositionContext, CompositionEngine, Controller, ViewSlot } from 'aurelia-templating';

import { invokeLifecycle } from './lifecycle';
import { NotificationController } from './notification-controller';
import { NotificationLevel } from './notification-level';
import { NotificationRenderer } from './notification-renderer';

export class NotificationService {
  public static inject = [CompositionEngine, Container, NotificationRenderer];

  constructor(private compositionEngine: CompositionEngine,
              private container: Container,
              private notificationRenderer: NotificationRenderer) {
  }

  public notify(model: any, settings?: any, level?: string) {
    settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);
    // tslint:disable-next-line:max-line-length
    const notificationController = new NotificationController(this.notificationRenderer, _createSettings(model, settings, level));
    const childContainer = this.container.createChild();
    childContainer.registerInstance(NotificationController, notificationController);

    return _getViewModel(this.container, childContainer, this.compositionEngine, notificationController)
      .then((returnedCompositionContext: CompositionContext) => {
        notificationController.viewModel = returnedCompositionContext.viewModel;

        return invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', settings.model)
          .then(canActivate => {
            if (canActivate) {
              this.compositionEngine.createController(returnedCompositionContext)
                .then((controller: Controller) => {
                  notificationController.controller = controller;
                  notificationController.view = controller.view;
                  controller.automate();

                  return this.notificationRenderer.createNotificationHost(notificationController);
                })
                .then(() => {
                  return this.notificationRenderer.showNotification(notificationController);
                });
            }
          });
      });
  }

  public info(message: string, settings?: any) {
    return this.notify(message, settings, NotificationLevel.info);
  }

  public success(message: string, settings?: any) {
    return this.notify(message, settings, NotificationLevel.success);
  }

  public warning(message: string, settings?: any) {
    return this.notify(message, settings, NotificationLevel.warning);
  }

  public danger(message: string, settings?: any) {
    return this.notify(message, settings, NotificationLevel.danger);
  }
}

function _createSettings(model: any, settings: any, level?: string) {
  let notification;
  if (typeof model === 'string') {
    notification = model;
  } else if (typeof model === 'object') {
    if (model.notification === undefined) {
      throw new Error('model must implement `notification` property.');
    }
    notification = model.notification;
  } else {
    throw new Error('type is not supported by `notify()`.');
  }

  settings.model = {
    notification,
    data: model,
    level: level || NotificationLevel.info
  };
  return settings;
}

function _getViewModel(container: Container,
                       childContainer: Container,
                       compositionEngine: CompositionEngine,
                       notificationController: NotificationController) {
  const compositionContext: CompositionContext = {
    container,
    childContainer,
    bindingContext: null,
    viewResources: null as any,
    model: notificationController.settings.model,
    viewModel: notificationController.settings.viewModel,
    viewSlot: new ViewSlot(undefined, true),
  };

  if (typeof compositionContext.viewModel === 'function') {
    compositionContext.viewModel = Origin.get(compositionContext.viewModel).moduleId;
  }

  if (typeof compositionContext.viewModel === 'string') {
    return compositionEngine.ensureViewModel(compositionContext);
  }

  return Promise.resolve(compositionContext);
}

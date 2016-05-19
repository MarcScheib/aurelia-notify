import {Container} from 'aurelia-dependency-injection';
import {inject} from 'aurelia-framework';
import {Origin} from 'aurelia-metadata';
import {CompositionEngine} from 'aurelia-templating';

import {invokeLifecycle} from './lifecycle';
import {NotificationController} from './notification-controller';
import {NotificationLevel} from './notification-level';
import {NotificationRenderer} from './notification-renderer';

@inject(CompositionEngine, Container, NotificationRenderer)
export class NotificationService {
  constructor(compositionEngine: CompositionEngine, container: Container, notificationRenderer: NotificationRenderer) {
    this.compositionEngine = compositionEngine;
    this.container = container;
    this.notificationRenderer = notificationRenderer;
  }

  _getViewModel(compositionContext) {
    if (typeof compositionContext.viewModel === 'function') {
      compositionContext.viewModel = Origin.get(compositionContext.viewModel).moduleId;
    }

    if (typeof compositionContext.viewModel === 'string') {
      return this.compositionEngine.ensureViewModel(compositionContext);
    }

    return Promise.resolve(compositionContext);
  }

  notify(message: string, settings?: any, level?: string) {
    let notificationLevel = level || NotificationLevel.info;
    let _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);

    _settings.model = {
      notification: message,
      level: notificationLevel
    };

    let notificationController = new NotificationController(this.notificationRenderer, _settings);
    let childContainer = this.container.createChild();
    let compositionContext = {
      viewModel: _settings.viewModel,
      container: this.container,
      childContainer: childContainer,
      model: _settings.model
    };

    childContainer.registerInstance(NotificationController, notificationController);

    return this._getViewModel(compositionContext).then(returnedCompositionContext => {
      notificationController.viewModel = returnedCompositionContext.viewModel;

      return invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(canActivate => {
        if (canActivate) {
          this.compositionEngine.createController(returnedCompositionContext)
            .then(controller => {
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


  info(message: string, settings?: any) {
    this.notify(message, settings, NotificationLevel.info);
  }

  success(message: string, settings?: any) {
    this.notify(message, settings, NotificationLevel.success);
  }

  warning(message: string, settings?: any) {
    this.notify(message, settings, NotificationLevel.warning);
  }

  danger(message: string, settings?: any) {
    this.notify(message, settings, NotificationLevel.danger);
  }
}

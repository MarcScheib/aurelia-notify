var _class, _temp;

import { Container } from 'aurelia-dependency-injection';
import { Origin } from 'aurelia-metadata';
import { CompositionEngine } from 'aurelia-templating';

import { invokeLifecycle } from './lifecycle';
import { NotificationController } from './notification-controller';
import { NotificationLevel } from './notification-level';
import { NotificationRenderer } from './notification-renderer';

export let NotificationService = (_temp = _class = class NotificationService {

  constructor(compositionEngine, container, notificationRenderer) {
    this.compositionEngine = compositionEngine;
    this.container = container;
    this.notificationRenderer = notificationRenderer;
  }

  notify(model, settings, level) {
    let notificationLevel = level || NotificationLevel.info;
    let _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);

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

    _settings.model = {
      notification: notification,
      data: model,
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

    return _getViewModel(compositionContext, this.compositionEngine).then(returnedCompositionContext => {
      notificationController.viewModel = returnedCompositionContext.viewModel;

      return invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(canActivate => {
        if (canActivate) {
          this.compositionEngine.createController(returnedCompositionContext).then(controller => {
            notificationController.controller = controller;
            notificationController.view = controller.view;
            controller.automate();

            return this.notificationRenderer.createNotificationHost(notificationController);
          }).then(() => {
            return this.notificationRenderer.showNotification(notificationController);
          });
        }
      });
    });
  }

  info(message, settings) {
    this.notify(message, settings, NotificationLevel.info);
  }

  success(message, settings) {
    this.notify(message, settings, NotificationLevel.success);
  }

  warning(message, settings) {
    this.notify(message, settings, NotificationLevel.warning);
  }

  danger(message, settings) {
    this.notify(message, settings, NotificationLevel.danger);
  }
}, _class.inject = [CompositionEngine, Container, NotificationRenderer], _temp);

function _getViewModel(compositionContext, compositionEngine) {
  if (typeof compositionContext.viewModel === 'function') {
    compositionContext.viewModel = Origin.get(compositionContext.viewModel).moduleId;
  }

  if (typeof compositionContext.viewModel === 'string') {
    return compositionEngine.ensureViewModel(compositionContext);
  }

  return Promise.resolve(compositionContext);
}
import {Container} from 'aurelia-dependency-injection';
import {inject} from 'aurelia-framework';
import {Origin} from 'aurelia-metadata';
import {CompositionEngine} from 'aurelia-templating';

import {invokeLifecycle} from './lifecycle';
import {NotificationController} from './notification-controller';
import {NotificationRenderer} from './notification-renderer';

@inject(CompositionEngine, Container, NotificationRenderer)
export class NotificationService {
  constructor(compositionEngine, container, notificationRenderer) {
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

  notify(settings) {
    // Todo: default settings needed here
    let _settings = Object.assign({}, settings);

    return new Promise((resolve, reject) => {
      let notificationController = new NotificationController(this.renderer, _settings, resolve, reject);
      let childContainer = this.container.createChild();
      let compositionContext = {
        viewModel: _settings.viewModel,
        container: this.container,
        childContainer: childContainer,
        model: _settings.model
      };

      childContainer.registerInstance(NotificationController, notificationController);

      this._getViewModel(compositionContext).then(returnedCompositionContext => {
        notificationController.viewModel = returnedCompositionContext.viewModel;

        return invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(canActivate => {
          if (canActivate) {
            return this.compositionEngine.createController(returnedCompositionContext).then(controller => {
              notificationController.controller = controller;
              notificationController.view = controller.view;
              controller.automate();

              return this.notificationRenderer.createNotificationHost(notificationController).then(() => {
                return this.notificationRenderer.showNotification(notificationController);
              });
            });
          }
        });
      });
    });
  }
}

var _class, _temp;



import { Container } from 'aurelia-dependency-injection';
import { Origin } from 'aurelia-metadata';
import { CompositionEngine } from 'aurelia-templating';

import { invokeLifecycle } from './lifecycle';
import { NotificationController } from './notification-controller';
import { NotificationLevel } from './notification-level';
import { NotificationRenderer } from './notification-renderer';

export var NotificationService = (_temp = _class = function () {
  function NotificationService(compositionEngine, container, notificationRenderer) {
    

    this.compositionEngine = compositionEngine;
    this.container = container;
    this.notificationRenderer = notificationRenderer;
  }

  NotificationService.prototype._getViewModel = function _getViewModel(compositionContext) {
    if (typeof compositionContext.viewModel === 'function') {
      compositionContext.viewModel = Origin.get(compositionContext.viewModel).moduleId;
    }

    if (typeof compositionContext.viewModel === 'string') {
      return this.compositionEngine.ensureViewModel(compositionContext);
    }

    return Promise.resolve(compositionContext);
  };

  NotificationService.prototype.notify = function notify(message, settings, level) {
    var _this = this;

    var notificationLevel = level || NotificationLevel.info;
    var _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);

    _settings.model = {
      notification: message,
      level: notificationLevel
    };

    var notificationController = new NotificationController(this.notificationRenderer, _settings);
    var childContainer = this.container.createChild();
    var compositionContext = {
      viewModel: _settings.viewModel,
      container: this.container,
      childContainer: childContainer,
      model: _settings.model
    };

    childContainer.registerInstance(NotificationController, notificationController);

    return this._getViewModel(compositionContext).then(function (returnedCompositionContext) {
      notificationController.viewModel = returnedCompositionContext.viewModel;

      return invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(function (canActivate) {
        if (canActivate) {
          _this.compositionEngine.createController(returnedCompositionContext).then(function (controller) {
            notificationController.controller = controller;
            notificationController.view = controller.view;
            controller.automate();

            return _this.notificationRenderer.createNotificationHost(notificationController);
          }).then(function () {
            return _this.notificationRenderer.showNotification(notificationController);
          });
        }
      });
    });
  };

  NotificationService.prototype.info = function info(message, settings) {
    this.notify(message, settings, NotificationLevel.info);
  };

  NotificationService.prototype.success = function success(message, settings) {
    this.notify(message, settings, NotificationLevel.success);
  };

  NotificationService.prototype.warning = function warning(message, settings) {
    this.notify(message, settings, NotificationLevel.warning);
  };

  NotificationService.prototype.danger = function danger(message, settings) {
    this.notify(message, settings, NotificationLevel.danger);
  };

  return NotificationService;
}(), _class.inject = [CompositionEngine, Container, NotificationRenderer], _temp);
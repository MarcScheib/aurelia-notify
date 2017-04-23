var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  NotificationService.prototype.notify = function notify(model, settings, level) {
    var _this = this;

    var _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);
    var notificationController = new NotificationController(this.notificationRenderer, _createSettings(model, _settings, level));
    var childContainer = this.container.createChild();
    childContainer.registerInstance(NotificationController, notificationController);

    return _getViewModel(this.container, childContainer, this.compositionEngine, notificationController).then(function (returnedCompositionContext) {
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

function _createSettings(model, settings, level) {
  var notification = void 0;
  if (typeof model === 'string') {
    notification = model;
  } else if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) === 'object') {
    if (model.notification === undefined) {
      throw new Error('model must implement `notification` property.');
    }
    notification = model.notification;
  } else {
    throw new Error('type is not supported by `notify()`.');
  }

  settings.model = {
    notification: notification,
    data: model,
    level: level || NotificationLevel.info
  };
  return settings;
}

function _getViewModel(container, childContainer, compositionEngine, notificationController) {
  var compositionContext = {
    container: container,
    childContainer: childContainer,
    model: notificationController.settings.model,
    viewModel: notificationController.settings.viewModel
  };

  if (typeof compositionContext.viewModel === 'function') {
    compositionContext.viewModel = Origin.get(compositionContext.viewModel).moduleId;
  }

  if (typeof compositionContext.viewModel === 'string') {
    return compositionEngine.ensureViewModel(compositionContext);
  }

  return Promise.resolve(compositionContext);
}
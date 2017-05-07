'use strict';

exports.__esModule = true;
exports.NotificationService = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaTemplating = require('aurelia-templating');

var _lifecycle = require('./lifecycle');

var _notificationController = require('./notification-controller');

var _notificationLevel = require('./notification-level');

var _notificationRenderer = require('./notification-renderer');



var NotificationService = exports.NotificationService = (_temp = _class = function () {
  function NotificationService(compositionEngine, container, notificationRenderer) {
    

    this.compositionEngine = compositionEngine;
    this.container = container;
    this.notificationRenderer = notificationRenderer;
  }

  NotificationService.prototype.notify = function notify(model, settings, level) {
    var _this = this;

    var _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);
    var notificationController = new _notificationController.NotificationController(this.notificationRenderer, _createSettings(model, _settings, level));
    var childContainer = this.container.createChild();
    childContainer.registerInstance(_notificationController.NotificationController, notificationController);

    return _getViewModel(this.container, childContainer, this.compositionEngine, notificationController).then(function (returnedCompositionContext) {
      notificationController.viewModel = returnedCompositionContext.viewModel;

      return (0, _lifecycle.invokeLifecycle)(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(function (canActivate) {
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
    this.notify(message, settings, _notificationLevel.NotificationLevel.info);
  };

  NotificationService.prototype.success = function success(message, settings) {
    this.notify(message, settings, _notificationLevel.NotificationLevel.success);
  };

  NotificationService.prototype.warning = function warning(message, settings) {
    this.notify(message, settings, _notificationLevel.NotificationLevel.warning);
  };

  NotificationService.prototype.danger = function danger(message, settings) {
    this.notify(message, settings, _notificationLevel.NotificationLevel.danger);
  };

  return NotificationService;
}(), _class.inject = [_aureliaTemplating.CompositionEngine, _aureliaDependencyInjection.Container, _notificationRenderer.NotificationRenderer], _temp);


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
    level: level || _notificationLevel.NotificationLevel.info
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
    compositionContext.viewModel = _aureliaMetadata.Origin.get(compositionContext.viewModel).moduleId;
  }

  if (typeof compositionContext.viewModel === 'string') {
    return compositionEngine.ensureViewModel(compositionContext);
  }

  return Promise.resolve(compositionContext);
}
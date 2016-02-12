'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaFramework = require('aurelia-framework');

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaTemplating = require('aurelia-templating');

var _lifecycle = require('./lifecycle');

var _notificationController = require('./notification-controller');

var _notificationRenderer = require('./notification-renderer');

var NotificationService = (function () {
  function NotificationService(compositionEngine, container, notificationRenderer) {
    _classCallCheck(this, _NotificationService);

    this.compositionEngine = compositionEngine;
    this.container = container;
    this.notificationRenderer = notificationRenderer;
  }

  NotificationService.prototype._getViewModel = function _getViewModel(compositionContext) {
    if (typeof compositionContext.viewModel === 'function') {
      compositionContext.viewModel = _aureliaMetadata.Origin.get(compositionContext.viewModel).moduleId;
    }

    if (typeof compositionContext.viewModel === 'string') {
      return this.compositionEngine.ensureViewModel(compositionContext);
    }

    return Promise.resolve(compositionContext);
  };

  NotificationService.prototype.notify = function notify(settings) {
    var _this = this;

    var _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);

    return new Promise(function (resolve, reject) {
      var notificationController = new _notificationController.NotificationController(_this.notificationRenderer, _settings, resolve, reject);
      var childContainer = _this.container.createChild();
      var compositionContext = {
        viewModel: _settings.viewModel,
        container: _this.container,
        childContainer: childContainer,
        model: _settings.model
      };

      childContainer.registerInstance(_notificationController.NotificationController, notificationController);

      _this._getViewModel(compositionContext).then(function (returnedCompositionContext) {
        notificationController.viewModel = returnedCompositionContext.viewModel;

        return _lifecycle.invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(function (canActivate) {
          if (canActivate) {
            return _this.compositionEngine.createController(returnedCompositionContext).then(function (controller) {
              notificationController.controller = controller;
              notificationController.view = controller.view;
              controller.automate();

              return _this.notificationRenderer.createNotificationHost(notificationController).then(function () {
                return _this.notificationRenderer.showNotification(notificationController);
              });
            });
          }
        });
      });
    });
  };

  var _NotificationService = NotificationService;
  NotificationService = _aureliaFramework.inject(_aureliaTemplating.CompositionEngine, _aureliaDependencyInjection.Container, _notificationRenderer.NotificationRenderer)(NotificationService) || NotificationService;
  return NotificationService;
})();

exports.NotificationService = NotificationService;
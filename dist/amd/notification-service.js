define(['exports', 'aurelia-dependency-injection', 'aurelia-framework', 'aurelia-metadata', 'aurelia-templating', './lifecycle', './notification-controller', './notification-level', './notification-renderer'], function (exports, _aureliaDependencyInjection, _aureliaFramework, _aureliaMetadata, _aureliaTemplating, _lifecycle, _notificationController, _notificationLevel, _notificationRenderer) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

    NotificationService.prototype.notify = function notify(message, settings, level) {
      var _this = this;

      var notificationLevel = level || _notificationLevel.NotificationLevel.info;
      var _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);

      _settings.model = {
        notification: message,
        level: notificationLevel
      };

      var notificationController = new _notificationController.NotificationController(this.notificationRenderer, _settings);
      var childContainer = this.container.createChild();
      var compositionContext = {
        viewModel: _settings.viewModel,
        container: this.container,
        childContainer: childContainer,
        model: _settings.model
      };

      childContainer.registerInstance(_notificationController.NotificationController, notificationController);

      this._getViewModel(compositionContext).then(function (returnedCompositionContext) {
        notificationController.viewModel = returnedCompositionContext.viewModel;

        return _lifecycle.invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(function (canActivate) {
          if (canActivate) {
            return _this.compositionEngine.createController(returnedCompositionContext);
          }
        }).then(function (controller) {
          notificationController.controller = controller;
          notificationController.view = controller.view;
          controller.automate();

          return _this.notificationRenderer.createNotificationHost(notificationController);
        }).then(function () {
          return _this.notificationRenderer.showNotification(notificationController);
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

    var _NotificationService = NotificationService;
    NotificationService = _aureliaFramework.inject(_aureliaTemplating.CompositionEngine, _aureliaDependencyInjection.Container, _notificationRenderer.NotificationRenderer)(NotificationService) || NotificationService;
    return NotificationService;
  })();

  exports.NotificationService = NotificationService;
});
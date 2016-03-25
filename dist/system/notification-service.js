'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-framework', 'aurelia-metadata', 'aurelia-templating', './lifecycle', './notification-controller', './notification-level', './notification-renderer'], function (_export, _context) {
  var Container, inject, Origin, CompositionEngine, invokeLifecycle, NotificationController, NotificationLevel, NotificationRenderer, _dec, _class, NotificationService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }, function (_aureliaTemplating) {
      CompositionEngine = _aureliaTemplating.CompositionEngine;
    }, function (_lifecycle) {
      invokeLifecycle = _lifecycle.invokeLifecycle;
    }, function (_notificationController) {
      NotificationController = _notificationController.NotificationController;
    }, function (_notificationLevel) {
      NotificationLevel = _notificationLevel.NotificationLevel;
    }, function (_notificationRenderer) {
      NotificationRenderer = _notificationRenderer.NotificationRenderer;
    }],
    execute: function () {
      _export('NotificationService', NotificationService = (_dec = inject(CompositionEngine, Container, NotificationRenderer), _dec(_class = function () {
        function NotificationService(compositionEngine, container, notificationRenderer) {
          _classCallCheck(this, NotificationService);

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
      }()) || _class));

      _export('NotificationService', NotificationService);
    }
  };
});
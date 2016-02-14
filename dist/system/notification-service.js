System.register(['aurelia-dependency-injection', 'aurelia-framework', 'aurelia-metadata', 'aurelia-templating', './lifecycle', './notification-controller', './notification-level', './notification-renderer'], function (_export) {
  'use strict';

  var Container, inject, Origin, CompositionEngine, invokeLifecycle, NotificationController, NotificationLevel, NotificationRenderer, NotificationService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
      NotificationService = (function () {
        function NotificationService(compositionEngine, container, notificationRenderer) {
          _classCallCheck(this, _NotificationService);

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

          return new Promise(function (resolve, reject) {
            var notificationController = new NotificationController(_this.notificationRenderer, _settings, resolve, reject);
            var childContainer = _this.container.createChild();
            var compositionContext = {
              viewModel: _settings.viewModel,
              container: _this.container,
              childContainer: childContainer,
              model: _settings.model
            };

            childContainer.registerInstance(NotificationController, notificationController);

            _this._getViewModel(compositionContext).then(function (returnedCompositionContext) {
              notificationController.viewModel = returnedCompositionContext.viewModel;

              return invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(function (canActivate) {
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

        var _NotificationService = NotificationService;
        NotificationService = inject(CompositionEngine, Container, NotificationRenderer)(NotificationService) || NotificationService;
        return NotificationService;
      })();

      _export('NotificationService', NotificationService);
    }
  };
});
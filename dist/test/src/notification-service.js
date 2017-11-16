define(["require", "exports", "aurelia-dependency-injection", "aurelia-metadata", "aurelia-templating", "./lifecycle", "./notification-controller", "./notification-level", "./notification-renderer"], function (require, exports, aurelia_dependency_injection_1, aurelia_metadata_1, aurelia_templating_1, lifecycle_1, notification_controller_1, notification_level_1, notification_renderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotificationService = /** @class */ (function () {
        function NotificationService(compositionEngine, container, notificationRenderer) {
            this.compositionEngine = compositionEngine;
            this.container = container;
            this.notificationRenderer = notificationRenderer;
        }
        NotificationService.prototype.notify = function (model, settings, level) {
            var _this = this;
            settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);
            // tslint:disable-next-line:max-line-length
            var notificationController = new notification_controller_1.NotificationController(this.notificationRenderer, _createSettings(model, settings, level));
            var childContainer = this.container.createChild();
            childContainer.registerInstance(notification_controller_1.NotificationController, notificationController);
            return _getViewModel(this.container, childContainer, this.compositionEngine, notificationController)
                .then(function (returnedCompositionContext) {
                notificationController.viewModel = returnedCompositionContext.viewModel;
                return lifecycle_1.invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', settings.model)
                    .then(function (canActivate) {
                    if (canActivate) {
                        _this.compositionEngine.createController(returnedCompositionContext)
                            .then(function (controller) {
                            notificationController.controller = controller;
                            notificationController.view = controller.view;
                            controller.automate();
                            return _this.notificationRenderer.createNotificationHost(notificationController);
                        })
                            .then(function () {
                            return _this.notificationRenderer.showNotification(notificationController);
                        });
                    }
                });
            });
        };
        NotificationService.prototype.info = function (message, settings) {
            return this.notify(message, settings, notification_level_1.NotificationLevel.info);
        };
        NotificationService.prototype.success = function (message, settings) {
            return this.notify(message, settings, notification_level_1.NotificationLevel.success);
        };
        NotificationService.prototype.warning = function (message, settings) {
            return this.notify(message, settings, notification_level_1.NotificationLevel.warning);
        };
        NotificationService.prototype.danger = function (message, settings) {
            return this.notify(message, settings, notification_level_1.NotificationLevel.danger);
        };
        NotificationService.inject = [aurelia_templating_1.CompositionEngine, aurelia_dependency_injection_1.Container, notification_renderer_1.NotificationRenderer];
        return NotificationService;
    }());
    exports.NotificationService = NotificationService;
    function _createSettings(model, settings, level) {
        var notification;
        if (typeof model === 'string') {
            notification = model;
        }
        else if (typeof model === 'object') {
            if (model.notification === undefined) {
                throw new Error('model must implement `notification` property.');
            }
            notification = model.notification;
        }
        else {
            throw new Error('type is not supported by `notify()`.');
        }
        settings.model = {
            notification: notification,
            data: model,
            level: level || notification_level_1.NotificationLevel.info
        };
        return settings;
    }
    function _getViewModel(container, childContainer, compositionEngine, notificationController) {
        var compositionContext = {
            container: container,
            childContainer: childContainer,
            bindingContext: null,
            viewResources: null,
            model: notificationController.settings.model,
            viewModel: notificationController.settings.viewModel
        };
        if (typeof compositionContext.viewModel === 'function') {
            compositionContext.viewModel = aurelia_metadata_1.Origin.get(compositionContext.viewModel).moduleId;
        }
        if (typeof compositionContext.viewModel === 'string') {
            return compositionEngine.ensureViewModel(compositionContext);
        }
        return Promise.resolve(compositionContext);
    }
});

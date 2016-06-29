'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationService = exports.NotificationRenderer = exports.globalSettings = exports.BSNotification = exports.NotificationController = exports.NotificationLevel = undefined;

var _class, _temp, _class3, _temp2;

exports.invokeLifecycle = invokeLifecycle;

var _aureliaPal = require('aurelia-pal');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaMetadata = require('aurelia-metadata');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationLevel = exports.NotificationLevel = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger'
};

function invokeLifecycle(instance, name, model) {
  if (typeof instance[name] === 'function') {
    var result = instance[name](model);

    if (result instanceof Promise) {
      return result;
    }

    if (result !== null && result !== undefined) {
      return Promise.resolve(result);
    }

    return Promise.resolve(true);
  }

  return Promise.resolve(true);
}

var NotificationController = exports.NotificationController = function () {
  function NotificationController(renderer, settings) {
    _classCallCheck(this, NotificationController);

    this._renderer = renderer;
    this.settings = settings;
  }

  NotificationController.prototype.close = function close() {
    var _this = this;

    clearTimeout(this.timer);

    return invokeLifecycle(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
      if (canDeactivate) {
        invokeLifecycle(_this.viewModel, 'deactivate').then(function () {
          return _this._renderer.hideNotification(_this);
        }).then(function () {
          return _this._renderer.destroyNotificationHost(_this);
        }).then(function () {
          _this.controller.unbind();
        });
      }
    });
  };

  return NotificationController;
}();

var BSNotification = exports.BSNotification = (_temp = _class = function () {
  function BSNotification(controller) {
    _classCallCheck(this, BSNotification);

    this.controller = controller;
  }

  BSNotification.prototype.activate = function activate(model) {
    this.level = model.level;
    this.notification = model.notification;
  };

  return BSNotification;
}(), _class.inject = [NotificationController], _temp);
var globalSettings = exports.globalSettings = {
  append: false,
  containerSelector: 'body',
  timeout: 0,
  viewModel: BSNotification,
  limit: 5
};

var transitionEvent = function () {
  var transition = null;

  return function () {
    if (transition) return transition;

    var t = void 0;
    var el = _aureliaPal.DOM.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        transition = transitions[t];
        return transition;
      }
    }

    return undefined;
  };
}();

var NotificationRenderer = exports.NotificationRenderer = function () {
  function NotificationRenderer() {
    _classCallCheck(this, NotificationRenderer);

    this.defaultSettings = globalSettings;

    this.notificationControllers = [];
  }

  NotificationRenderer.prototype.createNotificationHost = function createNotificationHost(notificationController) {
    var _this2 = this;

    var settings = notificationController.settings;
    var notificationHost = _aureliaPal.DOM.createElement('notification-host');
    var notificationContainer = this.getNotificationContainer(settings.containerSelector);

    if (settings.append === true) {
      notificationContainer.appendChild(notificationHost);
    } else {
      notificationContainer.insertBefore(notificationHost, notificationContainer.firstChild);
    }

    notificationController.slot = new _aureliaTemplating.ViewSlot(notificationHost, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = function () {
      _this2.notificationControllers.push(notificationController);

      if (_this2.notificationControllers.length >= settings.limit + 1) {
        _this2.notificationControllers[0].close(_this2.notificationControllers[0]);
      }

      notificationController.slot.attached();

      if (settings.timeout > 0) {
        notificationController.timer = setTimeout(notificationController.close.bind(notificationController), settings.timeout);
      }

      return new Promise(function (resolve) {
        function onTransitionEnd(e) {
          if (e.target !== notificationHost) {
            return;
          }
          notificationHost.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }

        notificationHost.addEventListener(transitionEvent(), onTransitionEnd);
        setTimeout(function () {
          notificationHost.classList.add('notification-host-active');
        }, 0);
      });
    };

    notificationController.hideNotification = function () {
      var i = _this2.notificationControllers.indexOf(notificationController);
      if (i !== -1) {
        _this2.notificationControllers.splice(i, 1);
      }

      return new Promise(function (resolve) {
        function onTransitionEnd() {
          notificationHost.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }

        notificationHost.addEventListener(transitionEvent(), onTransitionEnd);
        notificationHost.classList.remove('notification-host-active');
      });
    };

    notificationController.destroyNotificationHost = function () {
      notificationContainer.removeChild(notificationHost);
      notificationController.slot.detached();

      return Promise.resolve();
    };

    return Promise.resolve();
  };

  NotificationRenderer.prototype.showNotification = function showNotification(notificationController) {
    return notificationController.showNotification();
  };

  NotificationRenderer.prototype.hideNotification = function hideNotification(notificationController) {
    return notificationController.hideNotification();
  };

  NotificationRenderer.prototype.destroyNotificationHost = function destroyNotificationHost(notificationController) {
    return notificationController.destroyNotificationHost();
  };

  NotificationRenderer.prototype.getNotificationContainer = function getNotificationContainer(containerSelector) {
    var notificationContainer = _aureliaPal.DOM.querySelectorAll(containerSelector);
    if (notificationContainer === null) {
      notificationContainer = _aureliaPal.DOM.querySelectorAll('body');
    }

    return notificationContainer[0];
  };

  return NotificationRenderer;
}();

var NotificationService = exports.NotificationService = (_temp2 = _class3 = function () {
  function NotificationService(compositionEngine, container, notificationRenderer) {
    _classCallCheck(this, NotificationService);

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
    var _this3 = this;

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
          _this3.compositionEngine.createController(returnedCompositionContext).then(function (controller) {
            notificationController.controller = controller;
            notificationController.view = controller.view;
            controller.automate();

            return _this3.notificationRenderer.createNotificationHost(notificationController);
          }).then(function () {
            return _this3.notificationRenderer.showNotification(notificationController);
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
}(), _class3.inject = [_aureliaTemplating.CompositionEngine, _aureliaDependencyInjection.Container, NotificationRenderer], _temp2);
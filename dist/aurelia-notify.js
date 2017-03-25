import {DOM} from 'aurelia-pal';
import {ViewSlot,CompositionEngine} from 'aurelia-templating';
import {Container} from 'aurelia-dependency-injection';
import {Origin} from 'aurelia-metadata';

export let NotificationLevel = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger'
};

export function invokeLifecycle(instance: any, name: string, model: any) {
  if (typeof instance[name] === 'function') {
    let result = instance[name](model);

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

export class NotificationController {
  constructor(renderer: NotificationRenderer, settings: any) {
    this.renderer = renderer;
    this.settings = settings;
  }

  close() {
    clearTimeout(this.timer);

    return invokeLifecycle(this.viewModel, 'canDeactivate')
      .then(canDeactivate => {
        if (canDeactivate) {
          invokeLifecycle(this.viewModel, 'deactivate')
            .then(() => {
              return this.renderer.hideNotification(this);
            })
            .then(() => {
              return this.renderer.destroyNotificationHost(this);
            })
            .then(() => {
              this.controller.unbind();
            });
        }
      });
  }
}

export class BSNotification {
  static inject = [NotificationController];

  constructor(controller: NotificationController) {
    this.controller = controller;
  }

  activate(model: any) {
    this.level = model.level;
    this.notification = model.notification;
  }
}

export let globalSettings = {
  append: false,
  containerSelector: 'body',
  timeout: 0,
  viewModel: BSNotification,
  limit: 5
};

let transitionEvent = (function() {
  let transition = null;

  return function() {
    if (transition) return transition;

    let t;
    let el = DOM.createElement('fakeelement');
    let transitions = {
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
}());

export class NotificationRenderer {
  defaultSettings = globalSettings;

  constructor() {
    this.notificationControllers = [];
  }

  createNotificationHost(notificationController) {
    let settings = notificationController.settings;
    let notificationHost = DOM.createElement('notification-host');
    let notificationContainer = this.getNotificationContainer(settings.containerSelector);

    if (settings.append === true) {
      notificationContainer.appendChild(notificationHost);
    } else {
      notificationContainer.insertBefore(notificationHost, notificationContainer.firstChild);
    }

    notificationController.slot = new ViewSlot(notificationHost, true);
    notificationController.slot.add(notificationController.view);

    notificationController.showNotification = () => {
      this.notificationControllers.push(notificationController);

      if (this.notificationControllers.length >= (settings.limit + 1)) {
        this.notificationControllers[0].close(this.notificationControllers[0]);
      }

      notificationController.slot.attached();

      if (settings.timeout > 0) {
        notificationController.timer = setTimeout(notificationController.close.bind(notificationController), settings.timeout);
      }

      return new Promise((resolve) => {
        function onTransitionEnd(e) {
          if (e.target !== notificationHost) {
            return;
          }
          notificationHost.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }

        notificationHost.addEventListener(transitionEvent(), onTransitionEnd);
        setTimeout(() => {
          notificationHost.classList.add('notification-host-active');
        }, 0);
      });
    };

    notificationController.hideNotification = () => {
      let i = this.notificationControllers.indexOf(notificationController);
      if (i !== -1) {
        this.notificationControllers.splice(i, 1);
      }

      return new Promise((resolve) => {
        function onTransitionEnd() {
          notificationHost.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }

        notificationHost.addEventListener(transitionEvent(), onTransitionEnd);
        notificationHost.classList.remove('notification-host-active');
      });
    };

    notificationController.destroyNotificationHost = () => {
      notificationContainer.removeChild(notificationHost);
      notificationController.slot.detached();

      return Promise.resolve();
    };

    return Promise.resolve();
  }

  showNotification(notificationController) {
    return notificationController.showNotification();
  }

  hideNotification(notificationController) {
    return notificationController.hideNotification();
  }

  destroyNotificationHost(notificationController) {
    return notificationController.destroyNotificationHost();
  }

  getNotificationContainer(containerSelector) {
    let notificationContainer = DOM.querySelectorAll(containerSelector);
    if (notificationContainer === null) {
      notificationContainer = DOM.querySelectorAll('body');
    }

    return notificationContainer[0];
  }
}

export class NotificationService {
  static inject = [CompositionEngine, Container, NotificationRenderer];

  compositionEngine: CompositionEngine;
  container: Container;
  notificationRenderer: NotificationRenderer;

  constructor(compositionEngine: CompositionEngine, container: Container, notificationRenderer: NotificationRenderer) {
    this.compositionEngine = compositionEngine;
    this.container = container;
    this.notificationRenderer = notificationRenderer;
  }

  notify(model: any, settings?: any, level?: string) {
    let notificationLevel = level || NotificationLevel.info;
    let _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);

    let notification;
    if (typeof model === 'string') {
      notification = model;
    } else if (typeof model === 'object') {
      if (model.notification === undefined) {
        throw new Error('model must implement `notification` property.');
      }
      notification = model.notification;
    } else {
      throw new Error('type is not supported by `notify()`.');
    }

    _settings.model = {
      notification: notification,
      data: model,
      level: notificationLevel
    };

    let notificationController = new NotificationController(this.notificationRenderer, _settings);
    let childContainer = this.container.createChild();
    let compositionContext = {
      viewModel: _settings.viewModel,
      container: this.container,
      childContainer: childContainer,
      model: _settings.model
    };

    childContainer.registerInstance(NotificationController, notificationController);

    return _getViewModel(compositionContext, this.compositionEngine)
      .then(returnedCompositionContext => {
        notificationController.viewModel = returnedCompositionContext.viewModel;

        return invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model)
          .then(canActivate => {
            if (canActivate) {
              this.compositionEngine.createController(returnedCompositionContext)
                .then(controller => {
                  notificationController.controller = controller;
                  notificationController.view = controller.view;
                  controller.automate();

                  return this.notificationRenderer.createNotificationHost(notificationController);
                })
                .then(() => {
                  return this.notificationRenderer.showNotification(notificationController);
                });
            }
          });
      });
  }

  info(message: string, settings?: any) {
    this.notify(message, settings, NotificationLevel.info);
  }

  success(message: string, settings?: any) {
    this.notify(message, settings, NotificationLevel.success);
  }

  warning(message: string, settings?: any) {
    this.notify(message, settings, NotificationLevel.warning);
  }

  danger(message: string, settings?: any) {
    this.notify(message, settings, NotificationLevel.danger);
  }
}

function _getViewModel(compositionContext, compositionEngine) {
  if (typeof compositionContext.viewModel === 'function') {
    compositionContext.viewModel = Origin.get(compositionContext.viewModel).moduleId;
  }

  if (typeof compositionContext.viewModel === 'string') {
    return compositionEngine.ensureViewModel(compositionContext);
  }

  return Promise.resolve(compositionContext);
}

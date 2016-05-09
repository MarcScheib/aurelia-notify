import {inject} from 'aurelia-framework';
import {ViewSlot,CompositionEngine} from 'aurelia-templating';
import {Container} from 'aurelia-dependency-injection';
import {Origin} from 'aurelia-metadata';

@inject(NotificationController)
export class BSNotification {
  constructor(controller: NotificationController) {
    this.controller = controller;
  }

  activate(model: any) {
    this.level = model.level;
    this.notification = model.notification;
  }
}

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
    this._renderer = renderer;
    this.settings = settings;
  }

  close() {
    clearTimeout(this.timer);

    return invokeLifecycle(this.viewModel, 'canDeactivate').then(canDeactivate => {
      if (canDeactivate) {
        return invokeLifecycle(this.viewModel, 'deactivate');
      }
    }).then(() => {
      return this._renderer.hideNotification(this);
    }).then(() => {
      return this._renderer.destroyNotificationHost(this);
    }).then(() => {
      this.controller.unbind();
    });
  }
}

export let NotificationLevel = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger'
};

export let globalSettings = {
  append: false,
  containerSelector: 'body',
  timeout: 0,
  viewModel: BSNotification
};

export class NotificationRenderer {
  defaultSettings = globalSettings;

  constructor() {
    this.notificationControllers = [];
  }

  createNotificationHost(notificationController: NotificationController) {
    let settings = notificationController.settings;
    let notificationHost = document.createElement('notification-host');
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
      notificationController.slot.attached();

      if (settings.timeout > 0) {
        notificationController.timer = setTimeout(notificationController.close.bind(notificationController), settings.timeout);
      }

      return Promise.resolve();
    };

    notificationController.hideNotification = () => {
      let i = this.notificationControllers.indexOf(notificationController);
      if (i !== -1) {
        this.notificationControllers.splice(i, 1);
      }

      return Promise.resolve();
    };

    notificationController.destroyNotificationHost = () => {
      notificationContainer.removeChild(notificationHost);
      notificationController.slot.detached();

      return Promise.resolve();
    };

    return Promise.resolve();
  }

  showNotification(notificationController: NotificationController) {
    return notificationController.showNotification();
  }

  hideNotification(notificationController: NotificationController) {
    return notificationController.hideNotification();
  }

  destroyNotificationHost(notificationController: NotificationController) {
    return notificationController.destroyNotificationHost();
  }

  getNotificationContainer(containerSelector: string) {
    let notificationContainer = document.querySelector(containerSelector);
    if (notificationContainer === null) {
      notificationContainer = document.body;
    }

    return notificationContainer;
  }
}

@inject(CompositionEngine, Container, NotificationRenderer)
export class NotificationService {
  constructor(compositionEngine: CompositionEngine, container: Container, notificationRenderer: NotificationRenderer) {
    this.compositionEngine = compositionEngine;
    this.container = container;
    this.notificationRenderer = notificationRenderer;
  }

  _getViewModel(compositionContext) {
    if (typeof compositionContext.viewModel === 'function') {
      compositionContext.viewModel = Origin.get(compositionContext.viewModel).moduleId;
    }

    if (typeof compositionContext.viewModel === 'string') {
      return this.compositionEngine.ensureViewModel(compositionContext);
    }

    return Promise.resolve(compositionContext);
  }

  notify(message: string, settings?: any, level?: string) {
    let notificationLevel = level || NotificationLevel.info;
    let _settings = Object.assign({}, this.notificationRenderer.defaultSettings, settings);

    _settings.model = {
      notification: message,
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

    return this._getViewModel(compositionContext).then(returnedCompositionContext => {
      notificationController.viewModel = returnedCompositionContext.viewModel;

      return invokeLifecycle(returnedCompositionContext.viewModel, 'canActivate', _settings.model).then(canActivate => {
        if (canActivate) {
          return this.compositionEngine.createController(returnedCompositionContext);
        }
      }).then(controller => {
        notificationController.controller = controller;
        notificationController.view = controller.view;
        controller.automate();

        return this.notificationRenderer.createNotificationHost(notificationController);
      }).then(() => {
        return this.notificationRenderer.showNotification(notificationController);
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

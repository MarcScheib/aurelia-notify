define(["require", "exports", "aurelia-pal", "aurelia-templating", "./bs-notification"], function (require, exports, aurelia_pal_1, aurelia_templating_1, bs_notification_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.globalSettings = {
        append: false,
        containerSelector: 'body',
        timeout: 0,
        viewModel: bs_notification_1.BSNotification,
        limit: 5
    };
    var transitionEvent = (function () {
        var transition;
        return function () {
            if (transition) {
                return transition;
            }
            var t;
            var el = aurelia_pal_1.DOM.createElement('fakeelement');
            var transitions = {
                transition: 'transitionend',
                OTransition: 'oTransitionEnd',
                MozTransition: 'transitionend',
                WebkitTransition: 'webkitTransitionEnd'
            };
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    transition = transitions[t];
                    return transition;
                }
            }
            return '';
        };
    })();
    var NotificationRenderer = /** @class */ (function () {
        function NotificationRenderer() {
            this.defaultSettings = exports.globalSettings;
            this.notificationControllers = [];
        }
        NotificationRenderer.prototype.createNotificationHost = function (notificationController) {
            var _this = this;
            var settings = notificationController.settings;
            var notificationHost = aurelia_pal_1.DOM.createElement('notification-host');
            var notificationContainer = this.getNotificationContainer(settings.containerSelector);
            if (settings.append === true) {
                notificationContainer.appendChild(notificationHost);
            }
            else {
                notificationContainer.insertBefore(notificationHost, notificationContainer.firstChild);
            }
            notificationController.slot = new aurelia_templating_1.ViewSlot(notificationHost, true);
            notificationController.slot.add(notificationController.view);
            notificationController.showNotification = function () {
                _this.notificationControllers.push(notificationController);
                if (_this.notificationControllers.length >= (settings.limit + 1)) {
                    _this.notificationControllers[0].close();
                }
                notificationController.slot.attached();
                if (settings.timeout > 0) {
                    // tslint:disable-next-line:max-line-length
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
                var i = _this.notificationControllers.indexOf(notificationController);
                if (i !== -1) {
                    _this.notificationControllers.splice(i, 1);
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
        NotificationRenderer.prototype.showNotification = function (notificationController) {
            return notificationController.showNotification();
        };
        NotificationRenderer.prototype.hideNotification = function (notificationController) {
            return notificationController.hideNotification();
        };
        NotificationRenderer.prototype.destroyNotificationHost = function (notificationController) {
            return notificationController.destroyNotificationHost();
        };
        NotificationRenderer.prototype.getNotificationContainer = function (containerSelector) {
            var notificationContainer = aurelia_pal_1.DOM.querySelectorAll(containerSelector);
            if (notificationContainer === null) {
                notificationContainer = aurelia_pal_1.DOM.querySelectorAll('body');
            }
            return notificationContainer[0];
        };
        return NotificationRenderer;
    }());
    exports.NotificationRenderer = NotificationRenderer;
});

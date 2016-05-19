'use strict';

System.register(['aurelia-framework', './notification-controller'], function (_export, _context) {
  "use strict";

  var inject, NotificationController, _dec, _class, BSNotification;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_notificationController) {
      NotificationController = _notificationController.NotificationController;
    }],
    execute: function () {
      _export('BSNotification', BSNotification = (_dec = inject(NotificationController), _dec(_class = function () {
        function BSNotification(controller) {
          _classCallCheck(this, BSNotification);

          this.controller = controller;
        }

        BSNotification.prototype.activate = function activate(model) {
          this.level = model.level;
          this.notification = model.notification;
        };

        return BSNotification;
      }()) || _class));

      _export('BSNotification', BSNotification);
    }
  };
});
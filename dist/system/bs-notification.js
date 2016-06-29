'use strict';

System.register(['./notification-controller'], function (_export, _context) {
  "use strict";

  var NotificationController, _class, _temp, BSNotification;

  

  return {
    setters: [function (_notificationController) {
      NotificationController = _notificationController.NotificationController;
    }],
    execute: function () {
      _export('BSNotification', BSNotification = (_temp = _class = function () {
        function BSNotification(controller) {
          

          this.controller = controller;
        }

        BSNotification.prototype.activate = function activate(model) {
          this.level = model.level;
          this.notification = model.notification;
        };

        return BSNotification;
      }(), _class.inject = [NotificationController], _temp));

      _export('BSNotification', BSNotification);
    }
  };
});
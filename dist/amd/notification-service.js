define(["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var NotificationService = (function () {
    function NotificationService() {
      _classCallCheck(this, NotificationService);
    }

    NotificationService.prototype.info = function info(message) {
      console.log(message);
    };

    return NotificationService;
  })();

  exports.NotificationService = NotificationService;
});
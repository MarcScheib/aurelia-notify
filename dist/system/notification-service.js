System.register([], function (_export) {
  "use strict";

  var NotificationService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      NotificationService = (function () {
        function NotificationService() {
          _classCallCheck(this, NotificationService);
        }

        NotificationService.prototype.info = function info(message) {
          console.log(message);
        };

        return NotificationService;
      })();

      _export("NotificationService", NotificationService);
    }
  };
});
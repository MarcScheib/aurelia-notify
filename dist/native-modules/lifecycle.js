'use strict';

exports.__esModule = true;
exports.invokeLifecycle = invokeLifecycle;
function invokeLifecycle(instance, name, model) {
  if (typeof instance[name] === 'function') {
    return new Promise(function (resolve) {
      resolve(instance[name](model));
    }).then(function (result) {
      if (result !== null && result !== undefined) {
        return result;
      }
      return true;
    });
  }
  return Promise.resolve(true);
}
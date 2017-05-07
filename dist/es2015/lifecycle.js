export function invokeLifecycle(instance, name, model) {
  if (typeof instance[name] === 'function') {
    return new Promise(resolve => {
      resolve(instance[name](model));
    }).then(result => {
      if (result !== null && result !== undefined) {
        return result;
      }
      return true;
    });
  }
  return Promise.resolve(true);
}
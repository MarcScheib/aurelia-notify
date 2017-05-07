export function invokeLifecycle(instance: any, name: string, model?: any): Promise<any> {
  if (typeof instance[name] === 'function') {
    return new Promise(resolve => {
        resolve(instance[name](model))
      })
      .then(result => {
        if (result !== null && result !== undefined) {
          return result;
        }
        return true;
      });
  }
  return Promise.resolve(true);
}

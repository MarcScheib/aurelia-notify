export type LifecycleMethodName = 'canActivate' | 'activate' | 'canDeactivate' | 'deactivate';

export function invokeLifecycle(instance: object, name: LifecycleMethodName, model?: any): Promise<any> {
  if (typeof (instance as any)[name] === 'function') {
    return new Promise(resolve => {
      resolve((instance as any)[name](model));
    }).then(result => {
      if (result !== null && result !== undefined) {
        return result;
      }
      return true;
    });
  }
  return Promise.resolve(true);
}

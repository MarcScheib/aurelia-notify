export declare type LifecycleMethodName = 'canActivate' | 'activate' | 'canDeactivate' | 'deactivate';
export declare function invokeLifecycle(instance: object, name: LifecycleMethodName, model?: any): Promise<any>;

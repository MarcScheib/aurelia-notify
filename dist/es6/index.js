export * from './notification-service';
export * from './notification';

export function configure(config) {
  config.globalResources(
    './notification'
  );
}

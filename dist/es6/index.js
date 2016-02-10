export * from './notification-service';

export function configure(config) {
  config.globalResources('./notifications');
}

import { globalSettings } from './notification-renderer';

export * from './bs-notification';
export * from './notification-level';
export * from './notification-service';
export * from './notification-controller';

export function configure(config, callback) {
  config.globalResources('./bs-notification');

  if (typeof callback === 'function') {
    callback(globalSettings);
  }
}
import {globalSettings} from './notification-renderer';
export {BSNotification} from './bs-notification';

export function configure(config, callback) {
  config.globalResources(
    './bs-notification'
  );

  if (typeof callback === 'function') {
    callback(globalSettings);
  }
}

export {NotificationLevel} from './notification-level';
export {NotificationService} from './notification-service';
export {NotificationController} from './notification-controller';

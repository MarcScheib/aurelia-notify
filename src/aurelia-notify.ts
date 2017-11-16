import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { globalSettings } from './notification-renderer';

export function configure(frameworkConfig: FrameworkConfiguration,
                          callback?: (config: any) => void) {
  frameworkConfig.globalResources(
    PLATFORM.moduleName('./bs-notification')
  );

  if (typeof callback === 'function') {
    callback(globalSettings);
  }
}

export { BSNotification } from './bs-notification';
export { NotificationLevel } from './notification-level';
export { NotificationService } from './notification-service';
export { NotificationController } from './notification-controller';

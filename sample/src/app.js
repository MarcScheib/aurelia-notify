import {inject} from 'aurelia-framework';
import {NotificationService, Notification} from 'aurelia-notification';

@inject(NotificationService)
export class App {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  info() {
    this.notificationService.info('Info Message', { viewModel: Notification, model: 'Johohoo'});
  }

  success() {
    this.notificationService.success('Success Message');
  }

  warning() {
    this.notificationService.warning('Warning Message');
  }

  danger() {
    this.notificationService.danger('Danger Message');
  }
}

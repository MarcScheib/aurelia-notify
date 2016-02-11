import {inject} from 'aurelia-framework';
import {NotificationService, Notification} from 'aurelia-notification';

@inject(NotificationService)
export class App {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  submit() {
    this.notificationService.notify({ viewModel: Notification, model: 'Johohoo'});
  }
}

import {inject} from 'aurelia-framework';
import {NotificationService} from 'aurelia-notification';

@inject(NotificationService)
export class App {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  submit(){
    this.notificationService.info("blub");
  }
}

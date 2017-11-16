import { NotificationService } from '../../src/notification-service';
import { NotificationRenderer } from '../../src/notification-renderer';

import { Container } from 'aurelia-dependency-injection';
import { CompositionEngine } from 'aurelia-templating';

describe('the Notification Service', () => {
  let compositionEngine;
  let container;
  let renderer;
  let sut: NotificationService;

  beforeEach(() => {
    container = new Container();
    compositionEngine = container.get(CompositionEngine);
    renderer = new NotificationRenderer();
    sut = new NotificationService(compositionEngine, container, renderer);
  });

  it('should show a notification', () => {
    const result = sut.notify('Message');
    result.then((result: any) => {
      spyOn(result.renderer, 'createNotificationHost');
      spyOn(result.renderer, 'showNotification');
      expect(result.renderer.createNotificationHost).toHaveBeenCalled();
      expect(result.renderer.showNotification).toHaveBeenCalled();
    });
  });
});

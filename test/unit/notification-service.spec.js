import {NotificationService} from '../../src/notification-service';
import {NotificationRenderer} from '../../src/notification-renderer';

import {Container} from 'aurelia-dependency-injection';
import {CompositionEngine} from 'aurelia-templating';

describe('the Notification Service', () => {
  let container;
  let compositionEngine;
  let renderer;
  let sut;

  beforeEach(() => {
    container = new Container();
    compositionEngine = new CompositionEngine();
    renderer = new NotificationRenderer();
    sut = new NotificationService(container, compositionEngine, renderer);
  });

  it('should show a notification', () => {
    let result = sut.notify('Message');
    result.then(result => {
      spyOn(result.renderer, 'createNotificationHost');
      spyOn(result.renderer, 'showNotification');
      expect(result.renderer.createNotificationHost).toHaveBeenCalled();
      expect(result.renderer.showNotification).toHaveBeenCalled();
    });
  });
});

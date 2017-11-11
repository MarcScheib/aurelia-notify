import {BSNotification} from '../../src/bs-notification';
import {NotificationController} from '../../src/notification-controller';
import {NotificationRenderer} from '../../src/notification-renderer';

describe('the BSNotification View Model', () => {
  let renderer;
  let controller;
  let sut;

  beforeEach(() => {
    renderer = new NotificationRenderer();
    controller = new NotificationController(renderer, {});
    sut = new BSNotification(controller);
  });

  it('should hold the controller', () => {
    expect(sut.controller).toEqual(controller);
  });

  it('should save the message and info on activation', () => {
    let model = {
      level: 'info',
      notification: 'message'
    };
    sut.activate(model);
    expect(sut.level).toEqual(model.level);
    expect(sut.notification).toEqual(model.notification);
  });
});

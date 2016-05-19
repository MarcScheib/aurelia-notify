import {NotificationController} from '../../src/notification-controller';
import {NotificationRenderer} from '../../src/notification-renderer';
import {BSNotification} from '../../src/bs-notification';

export let defaultSettings = {
  append: false,
  containerSelector: 'body',
  timeout: 0,
  viewModel: BSNotification,
  limit: 5
};

describe('the Notification Renderer', () => {
  let sut;
  let controller;

  it('uses the default settings', done => {
    sut = new NotificationRenderer();
    expect(sut.defaultSettings).toEqual(defaultSettings);
    done();
  });

  xit('calls the corresponding controller methods', done => {
    sut = new NotificationRenderer();
    controller = new NotificationController(sut, defaultSettings);

    sut.createNotificationHost(controller);
    spyOn(controller, 'showNotification');
    spyOn(controller, 'hideNotification');
    spyOn(controller, 'destroyNotificationHost');
    sut.showNotification(controller);
    expect(controller.showNotification).toHaveBeenCalled();
    expect(controller.hideNotification).toHaveBeenCalled();
    expect(controller.destroyNotificationHost).toHaveBeenCalled();
    done();
  });
});

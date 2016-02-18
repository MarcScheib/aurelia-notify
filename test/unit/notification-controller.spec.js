import {NotificationController} from '../../src/notification-controller';

describe('the Notification Controller', () => {
  let renderer;
  let settings;
  let sut;

  beforeEach(() => {
    settings = { name: 'Notification' };
    sut = new NotificationController(renderer, settings);
  });

  it('should be created with a settings property', () => {
    expect(sut.settings).toEqual(settings);
  });
});

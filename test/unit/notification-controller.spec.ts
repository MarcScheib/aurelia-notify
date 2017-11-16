import { NotificationController } from '../../src/notification-controller';
import { NotificationRenderer } from '../../src/notification-renderer';

describe('the Notification Controller', () => {
  let renderer: NotificationRenderer;
  let settings: any;
  let sut: NotificationController;

  beforeEach(() => {
    renderer = new NotificationRenderer();
    settings = {name: 'Notification'};
    sut = new NotificationController(renderer, settings);
  });

  it('should be created with a settings property', () => {
    expect(sut.settings).toEqual(settings);
  });
});

import {NotificationLevel} from '../../src/notification-level';

describe('the notification levels', () => {
  it('should define info, success, warning, and danger levels', () => {
    expect(NotificationLevel.info).toEqual('info');
    expect(NotificationLevel.success).toEqual('success');
    expect(NotificationLevel.warning).toEqual('warning');
    expect(NotificationLevel.danger).toEqual('danger');
  });
});

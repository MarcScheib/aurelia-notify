import { BSNotification } from './bs-notification';

export interface NotificationSettings {
  append?: boolean;
  containerSelector?: string;
  limit?: number;
  timeout?: number;
  viewModel?: string | { new (...params: any[]): object } | object;

  /**
   * Data to be passed to the "activate" hook on the view model.
   */
  model?: any;
}

export class DefaultNotificationSettings implements NotificationSettings {
  public append = false;
  public containerSelector = 'body';
  public limit = 5;
  public timeout = 0;
  public viewModel = BSNotification;
}

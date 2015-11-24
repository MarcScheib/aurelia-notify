export function configure(aurelia, configCallback) {
  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    //configCallback(Notification.defaults);
  }

  //aurelia.singleton(NotificationConfig, Notification.defaults);
}

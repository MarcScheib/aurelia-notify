# Installation

## Plugin Installation via JSPM

The plugin installation happens via JSPM. Go to your project and verify npm (```npm install```) and jspm (```jspm install```) installation was already executed.

Now, you can install the notification plugin via the following command:

```
jspm install aurelia-notification
```

The command will add the plugin source code to your _jspm_packages_ directory as well as a mapping into your _config.js_ which looks similar to the following:

```
"aurelia-notification": "github:MarcScheib/aurelia-notification@x.y.z"
```

You can also add a specific branch to your application if you are looking for technical previews by executing the following command:

```
jspm install aurelia-notification=github:MarcScheib/aurelia-notification@master
```

This will add the current _master_ branch instead of the latest tagged version.

## Plugin Configuration in your Application

During the bootstrapping of the Aurelia Framework, you can include the notification plugin by simply adding it to the list of loaded plugins:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    ...
    .plugin('aurelia-notification'); // Add this line to load the plugin

  aurelia.start().then(a => a.setRoot('app', document.body));
}
```

# Getting started

A simple introduction for the **aurelia-notification** plugin is shown by using the Aurelia demo application [skeleton-navigation](https://github.com/aurelia/skeleton-navigation).

We start by setting up the project. Afterwards, we install and configure the plugin as shown in [Installation](https://github.com/MarcScheib/aurelia-notification/blob/master/doc/Intro.md#installation).

1. Clone the repository into your local project folder:

  ```
  git clone https://github.com/aurelia/skeleton-navigation.git
  ```
2. Switch into the _skeleton-navigation_ directory and choose one of your preferred starter kits. In this example, we choose the _skeleton-es2016_. Switch into that directory and install all _npm_ dependencies:

  ```
  cd skeleton-navigation
  cd skeleton-es2016
  npm install
  ```
3. In the same directory, install the _jspm_ dependencies:

  ```
  jspm install
  ```
4. Install the **aurelia-notification** dependency via _jspm_:

  ```
  jspm install aurelia-notification
  ```

The project is now set up together with the notification plugin and we can start using it. Via executing ```gulp watch``` you can start a server running the application.
It is then available via the shown URL on the command line (e.g. http://localhost:9000).

The next step is to configure the _aurelia-notification_ plugin. In your favored IDE, open the file _skeleton-navigation/skeleton-es2016/src/main.js_ and adjust it as follows:

```javascript
import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-notification');

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}

```

We simply added the ```.plugin('aurelia-notification')``` line. With this basic configuration, the plugin makes use of the available Bootstrap CSS styling. In case you want to use a different configuration, see the [Configuration](https://github.com/MarcScheib/aurelia-notification/blob/master/doc/Intro.md#configuration) section.

We can start adding notifications to our application now. The plugin exposes a **NotificationService** which is used to display our notifications. 
Open the file _skeleton-navigation/skeleton-es2016/src/welcome.js_ and edit the file as follows:

1. We need to import the **NotificationService** from the plugin. On top of the file, add the following line:

  ```javascript
  import {NotificationService} from 'aurelia-notification';
  ```
2. Inject the service into the constructor of the view-model as shown in the following snippet:

  ```javascript
  static inject = [NotificationService];
  constructor(notificationService){
    this.notificationService = notificationService;
  }
  ```
3. Now, we can add notifications, e.g. by showing an info notification instead of an alert box when submitting our name. Adjust the ```submit()``` method as follows:
 
  ```javascript
  submit() {
    this.previousValue = this.fullName;
    this.notificationService.info(`Welcome, ${this.fullName}!`);
  }
  ```
  > **Note:**  Make sure you use \` (backtick) instead of ' (apostrophe) for the ```info()``` method to use the ES2016 Template Literals and having the name replaced.

The page should update automatically when adding those changes if you started the application via ```gulp watch```. If you press the _Submit_ button multiple times, you can see how the notifications pop up. As you can see, the display of the notifications is not optimal.

By default, notifications are added to the ```<body>``` tag as the first child. We can change this, by configuring a different attachment point. Modify the service call in the ```submit()``` method as follows:

```javascript
this.notificationService.info(`Welcome, ${this.fullName}!`, {containerSelector: 'page-host'});
```

The notification is now displayed below the form and visible to the user directly. 

Beside the ```info()``` notification, there are three different methods available which in the base configuration make use of Bootstraps alert styles. Those are ```success()```, ```warning()```, and ```danger()```.

For more information on the configuration, see the Section [Configuration](https://github.com/MarcScheib/aurelia-notification/blob/master/doc/Intro.md#configuration). API information will be available soon.
 
# Configuration

The plugin supports global configuration for all notifications as well as a specialized configuration for each single notification.

## Global Configuration

The global configuration is handled together with the plugin registration during Aurelia's bootstrapping process. The following snippet shows, how configuration parameters are handed over to the plugin:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-notification', settings => {
      settings.timeout = 10000;
    });

  aurelia.start().then(a => a.setRoot('app', document.body));
}
```

For all available configuration parameters, see Section [Configuration Parameters](https://github.com/MarcScheib/aurelia-notification/blob/master/doc/Intro.md#configuration-parameters).

## Specialized Configuration

Beside the global configuration, it is also possible to specify a different configuration for each notification itself. Simply add another parameter to the notification service call holding the configuration parameters. The following snippet shows an example:

```javascript
this.notificationService.info('This notification lasts for 5s before it is closed automatically.', {timeout: 5000});
this.notificationService.danger('This notification lasts for 10s before it is closed automatically.', {timeout: 10000});
```

For all available configuration parameters, see Section [Configuration Parameters](https://github.com/MarcScheib/aurelia-notification/blob/master/doc/Intro.md#configuration-parameters).

## Configuration Parameters

The **aurelia-notification** plugin provides the following configuration parameters:
- `append`
  - Specifies whether notifications should be appended to the `notificationHost` instead of inserted as the first element.
  - **Default**: false
- `containerSelector` 
  - Specifies to which DOM element the created notification will be attached to. The container selector is applied to DOM tree and the first element returned will be used. If no element is found, the default value is used.
  - **Default**: 'body'
- `timeout`
  - Specifies the duration of the notification visibility. After the timeout, the notification is removed automatically if the user is not closing it. If zero is specified, the notification can only be cleared manually by the user.
  - **Default**: 0
- `viewModel`
  - Specifies which view model is used for the notification. This allows to specify own customized elements and data. The default settings makes use of Bootstrap styles.
  - **Default**: BSNotification

# Customization

TBD

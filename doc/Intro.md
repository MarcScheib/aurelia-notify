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

TBD

# Configuration

TBD

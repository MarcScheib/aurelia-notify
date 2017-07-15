# aurelia-notify

[![Build Status](https://img.shields.io/travis/MarcScheib/aurelia-notify/master.svg?style=flat-square)](https://travis-ci.org/MarcScheib/aurelia-notify) 
[![Coverage Status](https://img.shields.io/coveralls/MarcScheib/aurelia-notify/master.svg?style=flat-square)](https://coveralls.io/github/MarcScheib/aurelia-notify?branch=master)
[![Dependency Status](https://img.shields.io/david/MarcScheib/aurelia-notify.svg?style=flat-square)](https://david-dm.org/MarcScheib/aurelia-notify)
[![devDependency Status](https://img.shields.io/david/dev/MarcScheib/aurelia-notify.svg?style=flat-square)](https://david-dm.org/MarcScheib/aurelia-notify?type=dev)
[![npm Version](https://img.shields.io/npm/v/aurelia-notify.svg?style=flat-square)](https://www.npmjs.com/package/aurelia-notify)

A simple notification plugin for [Aurelia](http://www.aurelia.io/).

``` javascript
notification.info('A simple info notification');
```

## Documentation

- [Installation](https://github.com/MarcScheib/aurelia-notify/blob/master/doc/Intro.md#installation)
- [Getting started](https://github.com/MarcScheib/aurelia-notify/blob/master/doc/Intro.md#getting-started)
- [Configuration](https://github.com/MarcScheib/aurelia-notify/blob/master/doc/Intro.md#configuration)
- [Customization](https://github.com/MarcScheib/aurelia-notify/blob/master/doc/Intro.md#customization)

## Dependencies

This plugin has no external library dependencies and is completely based on [Aurelia](http://www.aurelia.io/).

Aurelia dependencies:

* [aurelia-dependency-injection](https://github.com/aurelia/dependency-injection)
* [aurelia-metadata](https://github.com/aurelia/metadata)
* [aurelia-pal](https://github.com/aurelia/pal)
* [aurelia-templating](https://github.com/aurelia/templating)

## Used By

This library is an optional plugin and not used by the core framework.

## Platform Support

This library can be used in the **browser**.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

  ```shell
  npm install -g jspm
  ```
3. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```
4. Ensure that you have Chrome installed. Karma runs the test suite in Chrome.

5. You can now run the tests with this command:

  ```shell
  karma start
  ```

## Running The Sample

To run the sample code using this plugin proceed with these additional steps:

1. Go to the `sample` directory and install dependencies using `jspm`:

  ```shell
  cd sample
  jspm install
  ```
2. Go back to the root of the project and use gulp to serve the sample project:

  ```shell
  cd ..
  gulp watch
  ```

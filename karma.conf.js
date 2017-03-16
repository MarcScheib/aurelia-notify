let paths = require('./build/paths');

module.exports = function (config) {
  let configuration = {
    basePath: '',

    frameworks: ['jspm', 'jasmine'],

    jspm: {
      loadFiles: ['test/unit/setup.js', paths.tests],
      serveFiles: [paths.source]
    },

    // list of files / patterns to load in the browser
    files: [],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [paths.tests]: ['babel'],
      [paths.source]: ['babel']
    },

    'babelPreprocessor': {
      options: {
        sourceMap: 'inline',
        presets: [['es2015', {loose: true}], 'stage-1'],
        plugins: [
          'syntax-flow',
          'transform-decorators-legacy',
          'transform-flow-strip-types',
          'istanbul'
        ]
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browsers: ['Chrome'],

    singleRun: false
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};

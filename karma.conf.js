var isparta = require('isparta');
var paths = require('./build/paths');
var babelOptions = require('./build/babel-options');

module.exports = function(config) {
  var configuration = {
    frameworks: ['jspm', 'jasmine'],

    jspm: {
      config: 'config.js',
      loadFiles: [paths.tests],
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
      [paths.source]: ['babel', 'sourcemap', 'coverage']
    },

    'babelPreprocessor': {
      options: {
        sourceMap: 'inline',
        presets: [ 'es2015-loose', 'stage-1'],
        plugins: [
          'syntax-flow',
          'transform-decorators-legacy',
          'transform-flow-strip-types'
        ]
      }
    },

    reporters: ['coverage', 'progress'],

    coverageReporter: {
      instrumenters: {
        isparta: isparta
      },

      instrumenter: {
        [paths.source]: 'isparta'
      },

      dir: 'build/reports/coverage/',

      reporters: [{
        type: 'text-summary'
      }, {
        type: 'html',
        subdir: 'html'
      }, {
        type: 'lcovonly',
        subdir: 'lcov',
        file: 'report-lcovonly.txt'
      }]
    },

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

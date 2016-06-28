var path = require('path');
var fs = require('fs');

// hide warning //
var emitter = require('events');
emitter.defaultMaxListeners = 20;

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

var paths = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  style: appRoot + '**/*.css',
  styleFolder: './styles',
  output: 'dist/',
  sample: 'sample',
  doc: './doc',
  tests: 'test/**/*.js',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/',
  packageName: pkg.name,
  ignore: [],
  useTypeScriptForDTS: false,
  importsToAdd: [],
  sort: true
};

paths.ignore = ['index.js'];
paths.files = [
  'bs-notification.js',
  'lifecycle.js',
  'notification-controller.js',
  'notification-level.js',
  'notification-renderer.js',
  'notification-service.js'
].map(function(file) {
  return paths.root + file;
});

module.exports = paths;

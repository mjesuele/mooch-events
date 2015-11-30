/* global Package */

Package.describe({
  name: 'mooch:events',
  summary: 'Provides a simple API for events',
  version: '0.1.0',
  git: 'https://github.com/mjesuele/mooch-events',
});

Package.onUse(function(api) {
  // Meteor releases below this version are not supported
  api.versionsFrom('1.2.0.1');

  // Core packages and 3rd party packages
  api.use('check');
  api.use('ddp');
  api.use('ecmascript');
  api.use('tracker');
  api.use('stevezhu:lodash');

  // The files of this package
  api.addFiles('shared/index.js', ['client', 'server']);
  api.addFiles('server/index.js', 'server');
  api.addFiles('client/index.js', 'client');

  // The variables that become global for users of your package
  api.export('Events', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use(['sanjo:jasmine@0.20.2']);
  api.use('mooch:events');
  api.addFiles('tests/shared/index.js', ['client', 'server']);
});

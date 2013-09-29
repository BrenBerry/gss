// Configure the AMD module loader
require.config({
  // The path where your JavaScripts are located
  // baseUrl: './app/',
  // For easier development, disable browser caching
  // Of course, this should be removed in a production environment
  // urlArgs: 'bust=' +  (new Date()).getTime(),
  // Specify the paths of vendor libraries
  paths: {
    jquery: '../components/scripts/jquery/jquery',
    underscore: '../components/scripts/lodash/lodash',
    backbone: '../components/scripts/backbone/backbone',
    handlebars: '../components/scripts/handlebars/handlebars',
    text: '../components/scripts/requirejs-text/text',
    chaplin: '../components/scripts/chaplin/chaplin'
  },
  // Underscore and Backbone are not AMD-capable per default,
  // so we need to use the AMD wrapping of RequireJS
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  }
});

// Bootstrap the application
require(['application', 'routes'], function(Application, routes) {
  new Application({
    routes: routes,
    controllerSuffix: '-controller'
  });
});
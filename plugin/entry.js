'use strict';

// Add out component to window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__ so the styleguide client can pick them
// up
window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__ = window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__ || {};
window.__STYLEGUIDE_PLUGIN_COMPONENTS_DO_NOT_TOUCH__['%%name%%'] = {
  name: '%%name%%',
  meta: require('!!%%metaLoader%%!%%requestPath%%'),
  source: require('!!%%sourceLoader%%!%%requestPath%%'),
  path: '%%path%%',
  component: (function component() {
    var component = require('!!%%request%%'); // eslint-disable-line
    return component.default || component;
  })()
};

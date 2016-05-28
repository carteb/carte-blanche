window.STYLEGUIDE_PLUGIN_CLIENT_API = {
  cache: {},

  // Lazy load the script for the given component
  load: function load(name) {
    var script = document.createElement('script'); // eslint-disable-line no-var
    script.type = 'text/javascript';
    script.src = window.STYLEGUIDE_PLUGIN_CLIENT_API.scripts[name];
    document.body.appendChild(script);
  },

  loadComplete: function loadComplete(name, data) {
    var event = document.createEvent('Event'); // eslint-disable-line no-var
    window.STYLEGUIDE_PLUGIN_CLIENT_API.cache[name] = {};
    window.STYLEGUIDE_PLUGIN_CLIENT_API.cache[name].component = data;
    window.STYLEGUIDE_PLUGIN_CLIENT_API.cache[name].navigation = {};
    event.initEvent(`styleguide-plugin-component-load_${name}`);
    document.documentElement.dispatchEvent(event);
  },

  on: function on(name, fn) {
    document.documentElement.addEventListener(
      `styleguide-plugin-component-load_${name}`,
      fn,
      false
    );
  },

  off: function off(name, fn) {
    document.documentElement.removeEventListener(
      `styleguide-plugin-component-load_${name}`,
      fn,
      false
    );
  },

  updateNavigation: function updateNavigation(name, pluginName, data) {
    var event = document.createEvent('Event'); // eslint-disable-line no-var
    window.STYLEGUIDE_PLUGIN_CLIENT_API.cache[name].navigation[pluginName] = data;
    event.initEvent('styleguide-plugin-update-navigation');
    document.documentElement.dispatchEvent(event);
  },
};

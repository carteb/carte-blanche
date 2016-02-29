window.__STYLEGUIDE_PLUGIN_CLIENT_API = {
  cache: {},

  // Lazy load the script for the given component
  load(name) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = window.__STYLEGUIDE_PLUGIN_CLIENT_API.scripts[name];
    document.body.appendChild(script);
  },

  loadComplete(name, data) {
    const event = document.createEvent('Event');
    window.__STYLEGUIDE_PLUGIN_CLIENT_API.cache[name] = data;
    event.initEvent('styleguide-plugin-component-load_' + name);
    document.documentElement.dispatchEvent(event);
  },

  on(name, fn) {
    document.documentElement.addEventListener('styleguide-plugin-component-load_' + name, fn, false);
  },

  off(name, fn) {
    document.documentElement.removeEventListener('styleguide-plugin-component-load_' + name, fn, false);
  },
};

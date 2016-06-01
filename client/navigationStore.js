import mapValues from 'lodash/mapValues';

const createNavigationStore = (components) => {
  /*
  Structure
  -------
  {
    path/to/button.js: {
      plugins: {
        react: [
          {
            link: '',
            name: '',
          }
        ]
      }
    }
  }
  */
  const state = mapValues(components, () => ({ plugins: {} }));
  const callbacks = [];

  const setPluginLinks = (path, plugin, links) => {
    state[path].plugins[plugin] = links;
    callbacks.forEach((callback) => { callback(); });
  };

  const subscribe = (callback) => {
    callbacks.push(callback);
  };

  const getState = () => state;

  return {
    setPluginLinks,
    subscribe,
    getState,
  };
};

export default createNavigationStore;

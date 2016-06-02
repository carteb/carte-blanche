/**
 * Registers the default plugins in case none were provided
 */

function registerDefaultPlugins(compiler) {
  try {
    const ReactPlugin = require('../../plugins/react/dist/plugin'); // eslint-disable-line global-require, max-len
    const reactPlugin = new ReactPlugin();
    reactPlugin.apply(compiler);
  } catch (err) {
    try {
      const ReactPlugin = require('carte-blanche-react-plugin'); // eslint-disable-line global-require, import/no-unresolved, max-len
      const reactPlugin = new ReactPlugin();
      reactPlugin.apply(compiler);
    } catch (ex) {
      console.log('ERROR Installing default CarteBlanche plugins failed.', ex); // eslint-disable-line no-console,max-len
    }
  }
}

export default registerDefaultPlugins;

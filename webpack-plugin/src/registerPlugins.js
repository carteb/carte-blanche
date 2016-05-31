/**
 * Register some plugins
 */

function registerPlugins(compiler, plugins) {
  for (let i = 0; i < plugins.length; i++) {
    plugins[i].apply(compiler);
  }
}

export default registerPlugins;

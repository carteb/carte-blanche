/**
 * apply.js
 *
 * This is the meat of our webpack plugin, it's what does all the component
 * finding and compiling
 */

import fs from 'fs';
import path from 'path';
import includes from 'lodash/includes';
import ExtraEntryWebpackPlugin from 'extra-entry-webpack-plugin';
import readMultipleFiles from 'read-multiple-files';

import emitAssets from './utils/emitAssets';
import registerPlugins from './registerPlugins';
import registerDefaultPlugins from './registerDefaultPlugins';

function apply(compiler) {
  const dest = this.options.dest;
  const filter = this.options.filter;

  // Register either the plugins or the default plugins
  if (this.options.plugins && this.options.plugins.length > 0) {
    registerPlugins(compiler, this.options.plugins);
  } else {
    registerDefaultPlugins(compiler);
  }

  // Compile the client
  const userBundleFileName = path.join(dest, 'user-bundle.js');
  const userEntries = compiler.options.entry;
  const devServerOptions = compiler.options.devServer;
  // Load the dynamic resolve loader with a placeholder file
  const extraEntries = [
    `!!${require.resolve('./dynamic-resolve.js')}?${
      JSON.stringify({
        filter: filter.toString(),
        componentRoot: this.options.componentRoot,
        context: compiler.context,
      })}!${require.resolve('./assets/placeholder.js')}`,
  ];
  // Find out if we need to include the webpack-dev-server client
  // TODO Test automatically if the user has any variant (middlware, devserver,...) of HMR enabled
  if (this.options.hot !== false && (this.options.hot === true ||
      (includes(userEntries, 'webpack-dev-server/client') && devServerOptions.hot)
    )) {
    if (includes(userEntries, 'webpack/hot/only-dev-server')) {
      extraEntries.unshift('webpack/hot/only-dev-server');
    }
    extraEntries.unshift(`webpack-dev-server/client?http://${devServerOptions.host}:${devServerOptions.port}`);
  }
  // Apply the ExtraEntry plugin with our entries above, a unique entryName
  // and ouput everything to userBundleFileName
  compiler.apply(new ExtraEntryWebpackPlugin({
    entry: extraEntries,
    entryName: `Atrium [${this.id}]`,
    outputName: userBundleFileName,
  }));

  // The client assets, default the HTML to only include the client bundles and the
  // user bundle
  const clientAssets = {
    'index.html': `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Styleguide</title>
        <link rel="stylesheet" type="text/css" href="client-bundle.css" />
      </head>
      <body>
        <div id='styleguide-root'></div>
        <script src="client-bundle.js"></script>
        <script src="user-bundle.js"></script>
      </body>
    </html>
    `,
    'client-bundle.js': fs.readFileSync(path.resolve(__dirname, './assets/client-bundle.js')),
    'client-bundle.css': fs.readFileSync(path.resolve(__dirname, './assets/main.css')),
  };

  compiler.plugin('emit', (compilation, callback) => {
    // If some custom files were passed by the user, default to them
    const assets = this.options.files || [];
    // Allow plugin developers to add assets to the client
    compilation.applyPlugins('styleguide-plugin-assets-processing', assets);
    // If any custom assets were passed in, read the files from the filesystem
    if (assets.length > 0) {
      readMultipleFiles(assets, (err, contents) => {
        if (err) {
          throw err;
        }
        const scripts = [];
        const styles = [];
        // Depending on the asset type that was passed add them to a script
        // or style tag
        assets.forEach((assetFilename, index) => {
          switch (assetFilename.substr(-3)) {
            case '.js': scripts.push(contents[index]); break;
            case 'css': styles.push(contents[index]); break;
            default: break;
          }
        });
        // Put together the HTML file based on the assets we got
        clientAssets['index.html'] = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Styleguide</title>
            <style>
              ${styles.join('\n')}
            </style>
            <link rel="stylesheet" type="text/css" href="client-bundle.css" />
          </head>
          <body>
            <div id='styleguide-root'></div>
            <script>
              ${scripts.join('\n')}
            </script>
            <script src="client-bundle.js"></script>
            <script src="user-bundle.js"></script>
          </body>
        </html>
        `;
        emitAssets(compilation, clientAssets, dest, callback);
      });
    } else {
      // If not custom assets were passed in by neither the user nor any plugins
      // emit the defaults straight away
      emitAssets(compilation, clientAssets, dest, callback);
    }
  });

  // Don't add the styleguide chunk to html files
  compiler.plugin('compilation', (compilation) =>
    compilation.plugin('html-webpack-plugin-alter-chunks', (chunks) =>
      chunks.filter((chunk) => chunk.files.indexOf(userBundleFileName) === -1)
  ));
}

export default apply;

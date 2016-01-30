import NodeTemplatePlugin from 'webpack/lib/node/NodeTemplatePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';
import LibraryTemplatePlugin from 'webpack/lib/LibraryTemplatePlugin';
import SingleEntryPlugin from 'webpack/lib/SingleEntryPlugin';
import path from 'path';

function StyleguidePlugin() {
  // Setup the plugin instance with options...
}

StyleguidePlugin.prototype.apply = (compiler) => {
  // compiler.plugin('done', () => {
  //   console.log('Worked well!');
  // });

  const filename = 'styleguide-bundle.js';

  compiler.plugin('make', (compilation, callback) => {
    const outputOptions = {
      path: path.join(__dirname, '../dist'),
      publicPath: compilation.outputOptions.publicPath,
      filename,
    };
    // TODO get a childcompiler to compile our internal client.js with the same
    // configuration as the app to styleguide-bundle.js
    const clientPath = path.join(__dirname, 'client.js');
    const childCompiler = compilation.createChildCompiler('styleguide-webpack-plugin', outputOptions);
    childCompiler.apply(new NodeTemplatePlugin(outputOptions));
    childCompiler.apply(new LibraryTemplatePlugin(null, 'window'));
    childCompiler.apply(new NodeTargetPlugin());
    childCompiler.apply(new SingleEntryPlugin(compiler, '!!' + clientPath));
    childCompiler.runAsChild(callback);


    // new JsonpTemplatePlugin(options.output),
    // new FunctionModulePlugin(options.output),
    // new NodeSourcePlugin(options.node),
    // new LoaderTargetPlugin("web")

    // childCompiler.apply(new NodeTemplatePlugin(outputOptions));
    // childCompiler.apply(new LibraryTemplatePlugin(null, "commonjs2"));
    // childCompiler.apply(new NodeTargetPlugin());
    // childCompiler.apply(new SingleEntryPlugin(this.context, "!!" + request));
    // childCompiler.apply(new LimitChunkCountPlugin({ maxChunks: 1 }));
  });

  // compiler.plugin('compilation', (compilation) => {
  //   console.log(compilation.compiler.options.output);
  // });

  compiler.plugin('emit', (compilation, callback) => {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Styleguide</title>
      </head>
      <body>
        <div id='styleguide-root'>Root</div>
        <script src="${filename}"></script>
      </body>
    </html>
    `;

    compilation.assets['styleguide.html'] = {
      source: () => {
        return html;
      },
      size: () => 0,
    };
    callback();
  });
};

export default StyleguidePlugin;

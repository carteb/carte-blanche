const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Styleguide</title>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
`;

function StyleguidePlugin() {
  // Setup the plugin instance with options...
}

StyleguidePlugin.prototype.apply = (compiler) => {
  // compiler.plugin('done', () => {
  //   console.log('Worked well!');
  // });

  compiler.plugin('emit', (compilation, callback) => {
    // Insert this list into the Webpack build as a new file asset:
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

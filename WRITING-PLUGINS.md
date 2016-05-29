# Writing Plugins

## Getting started

Lets pretend we're writing a plugin for an imaginary framework called "Reacular". We'll create a file in our plugin folder called `plugin.js`, which we'll export a function from called `ReacularPlugin()`:

```JS
// plugin.js
function ReacularPlugin(options) {
  this.options = options;
  /* … */
}

export default ReacularPlugin;
```

As you can see, this function gets called with a variable called `options` which we attach to the context. This is what the users of the plugin will pass into the instantiation. (this function doesn't do much more normally)

Lets say a user adds the `ReacularPlugin` to their configuration like this:

```JS
// webpack.dev.js
plugins: [
  new ReacularPlugin({
    someOption: 'someValue'
  });
]
```

Then the `options` variable in our function will be `{ someOption: 'someValue' }` and the plugin can adapt to the options the user passed in! We recommend attaching the options to `this`, so you can always refer to them in other methods of the plugin.

## `apply`

The main method of your plugin is `apply`:

```JS
// plugin.js
function ReacularPlugin(options) { /* … */ }

ReactPlugin.prototype.apply = function apply(compiler) {
  /* … */
};

export default ReacularPlugin;
```

The `apply` method gets called by Webpack automatically and passes a reference to the [Webpack compiler instance](https://webpack.github.io/docs/plugins.html#the-compiler-instance). With `compiler.plugin()` we can hook into numerous steps within the build process. (see the [general Webpack documentation about writing plugins](https://github.com/webpack/docs/wiki/How-to-write-a-plugin))

To make writing plugins easier, we've added to special lifecycle hooks in the compilation called `styleguide-plugin-before-processing` and `styleguide-plugin-processing`. To access them, attach a callback to the `compilation` step:

```JS
ReactPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('compilation', (compilation) => {
    /* … */
  });
};
```

You can now attach callbacks to our special hooks with `compilation.plugin()`, which get called for every single one of your components:

```JS
ReactPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('compilation', (compilation) => {
    compiler.plugin('styleguide-plugin-before-processing', (pluginData) => { /* … */ });
    compiler.plugin('styleguide-plugin-processing', (renderToClient) => { /* … */ });
  });
};
```

### `styleguide-plugin-before-processing`

In the `styleguide-plugin-before-processing` hook we pass you the source code of the component at `pluginData.source`. You can then e.g. statically analyze your components and attach more variables to the pluginData object:

```JS
compiler.plugin('styleguide-plugin-before-processing', (pluginData) => {
  pluginData.metaInformation = staticAnalysis(pluginData.source);
});
```

### `styleguide-plugin-processing`

In the `styleguide-plugin-processing` hook we pass you our `renderToClient` API for visually rendering something in the client. You call it with an object with a variety of fields, but you have to pass in the `name` field:

```JS
compilation.plugin('styleguide-plugin-processing', (renderToClient) => {
  renderToClient({
    name: 'reacular'
  });
});
```

There's two more important fields you can pass: `frontendData` and `frontendPlugin`. `frontendData` should be an object of data that is passed to your frontendPlugin function.

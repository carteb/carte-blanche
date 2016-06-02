# Writing Plugins

## Getting started

The easiest way to get started with your plugin is [`carte-blanche-plugin-boilerplate`](https://github.com/pure-ui/carte-blanche-plugin-boilerplate). Getting setup is a quick two step process:

1. Clone the plugin boilerplate:

  ```sh
  git clone git@github.com:pure-ui/carte-blanche-plugin-boilerplate
  ```

2. Execute the wizard script. It will ask you some questions and fill all files with your data.

  ```sh
  node ./carte-blanche-plugin-boilerplate/start
  ```

## `plugin.js`

Lets pretend we're writing a plugin for an imaginary framework called "Reacular". Take a look into your `plugin.js` file, which we export a function from called `ReacularPlugin()`:

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

### `apply`

The main method of your plugin is `apply`:

```JS
// plugin.js
function ReacularPlugin(options) { /* … */ }

ReacularPlugin.prototype.apply = function apply(compiler) {
  /* … */
};

export default ReacularPlugin;
```

The `apply` method gets called by Webpack automatically and passes a reference to the [Webpack compiler instance](https://webpack.github.io/docs/plugins.html#the-compiler-instance). With `compiler.plugin()` we can hook into steps within the build process. (see the [general Webpack documentation about writing plugins](https://github.com/webpack/docs/wiki/How-to-write-a-plugin))

To make writing plugins easier, we've added two special lifecycle hooks in the compilation called `carte-blanche-plugin-before-processing`, `carte-blanche-plugin-assets-processing` and `carte-blanche-plugin-processing`. To access them, attach a callback to the `compilation` step:

```JS
ReacularPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('compilation', function(compilation) {
    /* … */
  });
};
```

You can now attach callbacks to our special hooks with `compilation.plugin()`, which get called for every single one of your components:

```JS
ReacularPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('compilation', (compilation) => {
    compiler.plugin('carte-blanche-plugin-before-processing', function(pluginData) { /* … */ });
    compiler.plugin('carte-blanche-plugin-asset-processing', function(pluginData) { /* … */ });
    compiler.plugin('carte-blanche-plugin-processing', function(renderToClient) { /* … */ });
  });
};
```

### `carte-blanche-plugin-before-processing`

In the `carte-blanche-plugin-before-processing` hook we pass you the source code of the component at `pluginData.source`. You can then e.g. statically analyze your components and attach more variables to the pluginData object:

```JS
compiler.plugin('carte-blanche-plugin-before-processing', function(pluginData) {
  pluginData.metaInformation = staticAnalysis(pluginData.source);
});
```

### `carte-blanche-plugin-assets-processing`

In the `carte-blanche-plugin-assets-processing` hook we pass you an array of absolute paths to assets. This allows you to inject custom scripts and styling into the head of the client.

```JS
compiler.plugin('carte-blanche-plugin-assets-processing', function(assets) {
  assets.push(path.join(__dirname, './myCustomScript.js'));
  assets.push(path.join(__dirname, './myCustomStyles.css'));
});
```

> Note that `.css` and `.js` files are allowed to be added to the asset pipeline.

### `carte-blanche-plugin-processing`

In the `carte-blanche-plugin-processing` hook we pass you our `renderToClient` API for visually rendering something in the client. You call it with an object with a variety of fields, but you have to pass in the `name` field:

```JS
compilation.plugin('carte-blanche-plugin-processing', function(renderToClient) {
  renderToClient({
    name: 'reacular'
  });
});
```

There's two more important fields you can pass: `frontendData` and `frontendPlugin`:

```JS
compilation.plugin('carte-blanche-plugin-processing', function(renderToClient) {
  renderToClient({
    name: 'reacular',
    frontendData: { someVariable: true },
    frontendPlugin: "" + require.resolve('./frontend.js') + ""
  });
});
```

`frontendData` should be an object of data that is passed to your `frontendPlugin` function. In `frontendPlugin`, we pass in the `frontend.js` file **as a string** with `require.resolve`. This is the function that'll get called from the client and that can render react components into said client.

Lets take a look at what the default `frontend.js` file looks like!

## `frontend.js`

```JS
// frontend.js
var React = require('react');

module.exports = function playground(frontendData, pluginData, Component, componentPath) {
  /* … */
}
```

As you can see, our file gets called with four variables: `frontendData`, `pluginData`, `Component` and `componentPath`.

- `frontendData`: This is the exact same `frontendData` variable you already know and love from the `renderToClient` function in the webpack part of things. This is the interface between the frontend and the webpack part, and the variable gets piped through exactly how you put it in.

- `pluginData`: This is the exact same `pluginData` variable you already know and love from the `carte-blanche-plugin-before-processing` hook. Any information all the plugins have attached to this variable is accessible here!

- `Component`: This is the transpiled and ready-to-run code of the component that's  open in the client.

- `componentPath`: This is the path to the component in the users project. (e.g. something like `src/components/Button/index.js`) It's also what the URL of the client links to!

We can then return some react component from here which'll get rendered for each component:

```JS
// frontend.js
var React = require('react');

module.exports = function playground(frontendData, pluginData, Component, componentPath) {
  return (
    <MyApp
      componentToRender={Component}
      metaInformation={pluginData.metaInformation}
      someVariable={frontendData.someVariable}
    />
  );
}
```

## Further links

The best place to learn more from is the [Webpack documentation](https://github.com/webpack/docs/wiki/How-to-write-a-plugin). Since a CarteBlanche plugin is nothing more than a slightly extended Webpack plugin with some rendering sprinkled on top, you can use all the power you have from webpack to make your plugin the best ever!

A good idea might also be to check out other plugins, ranging from the small-and-digestible to the complex! (e.g. [ReacularPlugin](./plugins/react))

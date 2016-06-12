# Carte Blanche

Carte Blanche is an isolated development space with integrated fuzz testing for your components. See them individually, explore them in different states and quickly and confidently develop them.

[![Build Status](https://travis-ci.org/carteb/carte-blanche.svg?branch=master)](https://travis-ci.org/carteb/carte-blanche) [![Join the chat at https://gitter.im/carteb/carte-blanche](https://badges.gitter.im/carteb/carte-blanche.svg)](https://gitter.im/carteb/carte-blanche?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![Screenshot of Carte Blanche](https://cloud.githubusercontent.com/assets/7525670/15761445/8ae05d4a-2918-11e6-8573-bd9bd0ef2330.png)

## 30 seconds feature video on Youtube

[<img width="450" src="http://img.youtube.com/vi/6g3-TQ6aaw8/maxresdefault.jpg" >](http://www.youtube.com/watch?v=6g3-TQ6aaw8)

## Setup

**Please note that this project is in a beta state and under heavy development. We encourage you to try it out on your projects and letting us know of any issues you run into!**

**In addition we haven't invested time to make it work on windows yet. Let us know in case you want to help.**

Setting up Carte Blanche is an easy two-step process:

1. Install the plugin with `npm install --save-dev carte-blanche`

2. Add it to the plugins in your development webpack configuration, specifying a relative path to the folder with your components in the `componentRoot` option:
  ```JS
  var CarteBlanche = require('carte-blanche');
  /* … */
  plugins: [
    new CarteBlanche({
      componentRoot: './src/components'
    })
  ],
  ```

That's it, now start your development environment and go to `/carte-blanche` to see your Carte Blanche!

## Options

You can specify some options for the webpack plugin:

- `componentRoot` (required): Folder where your component modules are.

  ```JS
    plugins: [
      new CarteBlanche({
        componentRoot: 'src/components'
      })
    ]
  ```

- `dest` (default: `'carte-blanche'`): Change the location of your Carte Blanche. Needs to be a path.

  ```JS
    plugins: [
      new CarteBlanche({
        componentRoot: 'src/components',
        dest: 'components'
      })
    ]
  ```

- `plugins` (default: `ReactPlugin`): An array of plugins to use in your Carte Blanche. *(Want to write your own? See [writing-plugins.md](./WRITING-PLUGINS.md) for more information!)*

  ```JS
    var ReactPlugin = require('carte-blanche-react-plugin');
    var SourcePlugin = require('carte-blanche-source-plugin');

    plugins: [
      new CarteBlanche({
        componentRoot: 'src/components',
        plugins: [
         new SourcePlugin({ /* …options for the plugin here… */ }),
         new ReactPlugin()
        ]
      })
    ]
  ```

- `filter` (default: matches files that start with a capital letter and/or folders that start with a capital letter and contain an index file): Regex that matches your components in the `componentRoot` folder. *We do not recommend changing this, as it might have unintended side effects.*

  ```JS
    plugins: [
      new CarteBlanche({
        filter: /.*\.jsx$/ // Matches all files ending in .jsx
      })
    ]
  ```

- `hot`: The tool tries to auto dedect if you use HotReloading in your application. In any case if you don't have HotReloading we recommend to deactivate it with this option. Set it to true in case to force Carte Blanche to include it.

  ```JS
    plugins: [
      new CarteBlanche({
        hot: false
      })
    ]
  ```

This project has a custom plugin system to make it as extensible as possible. By default, we include the `ReactPlugin`, which has options of itself. *(to pass these in you'll have to explicitly specify it with the `plugins` option)*

### ReactPlugin Options

- `variationFolderName` (default: `variations`): The name of the folders that stores the variation files.
  ```JS
  new ReactPlugin({
    variationFolderName: 'examples'
  })
  ```

- `port` (default: 8082): The port the variations server runs at.
  ```JS
  new ReactPlugin({
    port: 7000
  })
  ```

- `hostname` (default: `localhost`): The URL the variations server runs at.
  ```JS
  new ReactPlugin({
    hostname: 'mydomain.com'
  })
  ```

- `injectTags` (default: empty Array): Injects these tags into the iFrames of the rendered components. Useful for webfonts, stylesheets, etc.
  ```JS
  new ReactPlugin({
    injectTags: ['<link href="…" rel="stylesheet />'],
  }),
  ```
  Example usage: https://github.com/carteb/carte-blanche/blob/master/examples/users/webpack.dev.babel.js#L35-L37

- `files` (default: empty Array): Users can add custom .js and .css files to the iFrame with the files option.
  ```JS
  new ReactPlugin({
    files: [
      path.join(__dirname, 'customStyles.css'),
    ],
  }),
  ```
  Example usage: https://github.com/carteb/carte-blanche/blob/master/examples/redux/todomvc/webpack.config.babel.js#L30-L32

## Plugins

This is a list of endorsed plugins that are useable right now:

- **[`carte-blanche-react-plugin`](./plugins/react)**: CarteBlanche + React = ❤︎ (installed if no other plugins are specified)
- [`carte-blanche-source-plugin`](./plugins/source): Show the source code of your components right in the interface!

Want to write your own plugin? Check out [`writing-plugins.md`](./WRITING-PLUGINS.md)!

## Examples

Examples are in the `examples` directory. To run them, first run the command `npm run examples:directory`, where `directory` is the path to the example, with each directory separated by `:`.

For example, to run the Redux TodoMVC example, run `npm run example:redux:todomvc`.

## License

Copyright (c) 2016 Nikolaus Graf and Maximilian Stoiber, licensed under the MIT License.

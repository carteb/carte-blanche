# styleguide

## Setup

```
$ git clone https://github.com/pure-ui/styleguide
$ npm install
```

## Structure

```
client
└── client.js   # The client users see at /styleguide.html
examples        # The Example Apps
└── simple      # Simple Example without any fanciness
plugin          # The Plugin itself
├── component-loader.js
├── entry.js
├── loader.js
└── styleguide-plugin.js
```

## Client

To start the development server for the client, run

```
$ npm run client:dev
```

To build the client to use the new version in the plugin, run

```
$ npm run client:build
```

> Note: Currently, it is not possible to use the live development version of the client during plugin development. You'll have to build it before the new version appears in the plugin.

## Example Apps for Plugin Development

**CURRENTLY BROKEN DUE TO [this LoC](plugin/styleguide-plugin.js#L50) and the architectural refactor**

For the actual development of the plugin, we have a few example apps prepared.

To use them, run

```
$ npm run example:<examplename>
$ npm run example:simple
```

You can also run the app in iron-node using

```
$ npm run example:<examplename>:iron
$ npm run example:simple:iron
```

> Note: `$ npm start` aliases to `$ npm run example:simple`

You can then visit `http://localhost:3000` to see the app and `http://localhost:3000/styleguide.html` to see the styleguide!

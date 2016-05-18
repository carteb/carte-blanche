# Styleguide

### NOTE: This is a highly experimental project. Please help us by not sharing it yet :)

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
└── dev         # Example used for Plugin Development
plugin          # The Plugin itself
├── component-loader.js
├── entry.js
├── loader.js
└── styleguide-plugin.js
```

### Client

#### Development

To start the development server for the client, run the below command and go to `http://localhost:3001`.

```
$ npm run client:dev
```

#### Building

To build the client to use the new version in the plugin, run

```
$ npm run client:build
```

> Note: Currently, it is not possible to use the live development version of the client during plugin development. You'll have to build it before the new version appears in the plugin.

### Example Apps for Plugin Development

#### Development

For the development of the plugin itself, we have a few example apps prepared.

To use them, run

```
$ npm run example:<examplename>
$ npm run example:dev
```

You can then visit `http://localhost:3000` to see the app and `http://localhost:3000/styleguide.html` to see the styleguide!

> Note: `$ npm start` aliases to `$ npm run example:dev`

##### `iron-node`

You can also run the app in iron-node using

```
$ npm run example:<examplename>:iron
$ npm run example:dev:iron
```

# Contributing

Thanks so much for taking an interest in Carte Blanche, we value contributions of all kinds! Below are some explanations to help you get set up in the development environment.

## Setup

```
$ git clone https://github.com/pure-ui/carte-blanche
$ npm install
```

## Usage & Plugin Development

## Development

### Client

For the development of the client (`client/` folder) we prepared some example apps.

To use them, run

```
$ npm run example:<examplename>
$ npm run example:dev
```

You can then visit `http://localhost:8080` to see the app and `http://localhost:8080/carte-blanche` to see the carte-blanche!

> Note: `$ npm start` aliases to `$ npm run example:dev`

Here the full list of examples:

```sh
$ npm run example:dev       # Complex PropTypes, almost no styling. Perfect for dev
$ npm run example:profile   # Simple, visually nice example
$ npm run example:dest      # Has the dest option enabled at /examples/
$ npm run example:radium    # Styles the example app with Radium
$ npm run example:jss       #           --“--             JSS
$ npm run example:aphrodite #           --“--             Aphrodite
```

To build the client, run `$ npm run client:build`.

### Core

We use `iron-node` to develop the webpack plugin. (`webpack-plugin/` folder) `iron-node` runs your Node process in Electron, meaning you get access to the full Chrome DevTools for the Node process. This allows you to use `debugger;` statements and step through your code, be able to `console.log` complex data types (Objects, Arrays,…) and much more!

```sh
$ npm run example:<examplename>:iron
```

> Note: this command doesn't exist for all examples, but would be trivial to add

### Plugins

One important plugin lives in this repo, the ReactPlugin. It's in the `plugins/react/` folder, and has it's entire own build process. Run one of the examples from above, and in another terminal instance start

```sh
$ npm run plugins:react:dev
```

to get hot reloading of the ReactPlugin.

To build the client for publishing a new release, run

```sh
$ npm run plugins:react:build
```

### Utils

We have some shared utils, which we use in both the client and some plugins in the `utils/` folder. We publish them separately, and they have their own building, testing and linting process. Develop them using TDD (test driven development) by running `npm run test -- --watch` in the `utils/` folder.

## Structure

```
client
└── client.js   # The client users see at /carte-blanche
examples        # The Example Apps used for development and demos
plugins         # Some plugins we wrote ourselves
├── react       # The ReactPlugin
└── source      # SourcePlugin (shows the source code of the component)
utils           # Some shared utilities (`carte-blanche-utils`)
webpack-plugin  # The main webpack plugin
├── src         # The source code
└── index.js    # The main entry file
```

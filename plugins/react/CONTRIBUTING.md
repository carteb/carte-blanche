# Contributing

## How does this plugin work?

The main entry point that's run by webpack is the root folder `plugin.js` file. It handles the options passed in, starts the node server we use to save variations and listens to the plugin events by the CarteBlanche webpack plugin.

We group all files (except `plugin.js`) into two categories: The Node.js server and the frontend. (in the`server/` and `frontend/` folder respectively)

### Server

When you start CarteBlanche with the react plugin, we run a express.js server. This server uses `fs` to save variations of components to the project folder.

`server/run.js` starts the server, `server/server.js` is the actual express.js server. We also create a WebSocket connection to the frontend part of things, so when users change the variation files themselves we can update the rendered components in the frontend. (simulated hot-reloading for the variation .js files, basically)

### Frontend

The frontend uses React (duh) to render the components of the users project. The [README in the `frontend` folder](./frontend/README.md) explains more about the architecture and mental model!

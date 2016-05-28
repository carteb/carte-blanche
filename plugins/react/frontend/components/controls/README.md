# Controls

These control components control the input of prop types for variations. They are split into base controls, e.g. for strings, numbers, arrays, and advanced (more specific) controls, e.g. names, avatars.

The `defaultControls.js` file in the root maps prop and flow types to control components.

Every control has to have an `index.js` file, which is the main file that renders the actual input in the `PropForm`. They might also contain a `randomValue.js` file, which exports a function that generates a random value for the type. (has to be attached to `Control.randomValue` in `index.js`, see [`StringControl/index.js`](./StringControl/index.js))

Controls can also have a `ConstraintsForm`, which is rendered in the `CustomMetadataForm`. This form lets users select more specific options for randomisation, e.g. minimum and maximum for generated numbers. (has to be attached to `Control.ConstraintsForm` in `index.js`, see [`NumberControl/index.js`](./NumberControl/index.js))

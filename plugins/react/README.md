# ReactPlugin

This plugin gives you an isolated development space for your react components. It starts a server at `localhost:8082` for saving and editing your variations.

## Usage

```JS
new StyleguidePlugin({
  includes: /* … */,
  plugins: [
    new ReactPlugin()
  ]
})
```

## Options

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

# `atrium-utils-beta`

Shared utils for Atrium, used in some plugins and the core client.

## `getVariationPathFromComponentPath`

Turns a filename into a folder path, i.e. turns `/folder/components/Button.js` into `/folder/components/Button`. Also works with index files, turns `/folder/components/Button/index.js` into `/folder/components/Button` too.

## `getComponentNameFromPath`

Gets the component name from a path, i.e. turns `/folder/components/Button.js` into `Button`. Uses `getVariationPathFromComponentPath` under the hood, so handles index files and file endings fine.

## `getStylingNodes`

Returns all styling related notes on the page. (i.e. `style` and `link` tags with a `rel="stylesheet"`)

## `keycodes`

The keycodes we need for keyboard controls.

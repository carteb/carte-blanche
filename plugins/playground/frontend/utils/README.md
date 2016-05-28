# `utils`

This folder contains a "few" utility files we need:

- `addDataToVariation`: Adds some arbitrary data to a variation string

- `codeToCustomMetadata`: Converts the human readable metadata we got sent from the server to a JS object

- `customMetadataToCode`: Does the reverse of the above, i.e. converting a JS object to an human readable string

- `getControl`: Handles the control selection based on the propType and the selected control

- `normalizeMetaInfo`: Currently unused utility to normalize the PropType vs Flow data we get from react-docgen

- `propsToVariation`: Converts a JS object of props to an human readable string

- `variationsToProps`: Does the reverse of the above, i.e. converts a list of human readable strings to JS objects

- `randomValues`: Generates random values for all props of a component

- `renderControls`: Renders the controls for the PropTypes

- `valueOrNullOrUndefined`: Returns null or undefined 5% of the time, and the value passed in 95% of the time

Most of these (except `getControl`, `randomValues` and `valueOrNullOrUndefined`) have tests in the `__test__` folder! Take a look at those tests for a sort-of executable documentation.

/* eslint-disable no-param-reassign, max-len */

// Validates and defaults the options
function validateOptions(options) {
  // Default options to our preferred value
  options.dest = options.dest || 'carte-blanche';
  options.filter = options.filter || /([A-Z][a-zA-Z]*\/index|[A-Z][a-zA-Z]*)\.(jsx?|es6)$/;

  // Assert that the componentRoot option was specified
  if (!options.componentRoot) {
    throw new Error(
      'You need to specify where your components are in the "componentRoot" option!\n\n'
    );
  }

  // Assert that the plugins option is an array if specified
  if (options.plugins && !Array.isArray(options.plugins)) {
    throw new Error('The "plugins" option needs to be an array!\n\n');
  }

  // Assert that the files option is an array if specified
  if (options.files && !Array.isArray(options.files)) {
    throw new Error('The "files" option needs to be an array!\n\n');
  }
}

export default validateOptions;

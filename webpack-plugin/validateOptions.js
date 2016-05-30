/* eslint-disable no-param-reassign */
/**
 * Validates the options passed into the core by the users
 */

import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';

function validateOptions(options) {
  // Assert that the include option was specified
  if (!options.componentRoot) {
    throw new Error(
      'You need to specify where your components are in the "componentRoot" option!\n\n'
    );
  }

  // Assert that the client option is properly formatted
  if (options.client) {
    // Format the client option if only a string was passed in, assuming it is the
    // path to the markup file that was passed
    if (isString(options.client)) {
      options.client = {
        markup: options.client,
      };
    // If the client option is neither a string nor an object, something is wrong
    } else if (!isPlainObject(options.client)) {
      throw new Error(
        'The "client" option needs to be an object!\n\n'
      );
    }

    // The users need to replace the markup of the client if they replace anything
    if (!options.client.markup) {
      throw new Error(
        'The "client.markup" option needs to be specified if you want to ' +
        'render a custom client!\n\n'
      );
    }
    // If the client script, styles or markup property is not a string, something is wrong
    if (!isString(options.client.markup)) {
      throw new Error('The "client.markup" option needs to be a path to a file as a string!\n\n');
    }
    if (options.client.styles && !isString(options.client.script)) {
      throw new Error('The "client.script" option needs to be a path to a file as a string!\n\n');
    }
    if (options.client.styles && !isString(options.client.styles)) {
      throw new Error('The "client.styles" option needs to be a path to a file as a string!\n\n');
    }
  }

  // Assert that the plugins option is an array if specified
  if (options.plugins && !isArray(options.plugins)) {
    throw new Error('The "plugins" option needs to be an array!\n\n');
  }
}

export default validateOptions;

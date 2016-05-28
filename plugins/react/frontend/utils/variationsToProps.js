/* eslint-disable no-param-reassign */
import mapValues from 'lodash/mapValues';

const MATCH_LAST_SEMICOLON_REGEX = /;\s*$/;

const variationsToProps = (variations) => (
  mapValues(variations, (variation) => {
    // Remove all the superflous stuff we added for readability
    // in the saved files
    const variationAsCode = variation.replace(MATCH_LAST_SEMICOLON_REGEX, '');
    // Parse the JSON
    let wrapper;
    try {
      eval(`wrapper = ${variationAsCode}`); // eslint-disable-line no-eval
    } catch (err) {
      wrapper = { err: err.stack };
    }
    return wrapper;
  })
);

export default variationsToProps;

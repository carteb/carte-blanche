/* eslint-disable no-param-reassign */
import mapValues from 'lodash/mapValues';

const MATCH_FIRST_CURLY_BRACES_REGEX = /^\s*\{/;
const MATCH_LAST_CURLY_BRACES_REGEX = /\};\s*$/;
const PROPS_REGEX = /\s*"props":\s*/;

// Remove all the superflous stuff we added for readability
// in the saved files
const parse = (variation) => (
  variation
    .replace(MATCH_FIRST_CURLY_BRACES_REGEX, '')
    .replace(MATCH_LAST_CURLY_BRACES_REGEX, '')
    .replace(PROPS_REGEX, '')
);

const variationsToProps = (variations) => (
  mapValues(variations, (variation) => {
    const variationAsCode = parse(variation);
    return JSON.parse(variationAsCode);
  }
));

export default variationsToProps;

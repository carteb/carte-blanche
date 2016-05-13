/* eslint-disable no-param-reassign */
import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';

const MATCH_FIRST_CURLY_BRACES_REGEX = /^\s*\{/;
const MATCH_LAST_CURLY_BRACES_REGEX = /\};\s*$/;
const PROPS_REGEX = /\s*props: /;
const LAST_COMMA_REGEX = /,\s*$/;

// Remove all the superflous stuff we added for readability
// in the saved files
const parse = (variations) => {
  let props;
  const code =
    variations
      .replace(MATCH_FIRST_CURLY_BRACES_REGEX, '')
      .replace(MATCH_LAST_CURLY_BRACES_REGEX, '')
      .replace(PROPS_REGEX, 'props = ')
      .replace(LAST_COMMA_REGEX, ';');
  eval(code); // eslint-disable-line no-eval
  return props;
};

// Convert the data structure to the needed data structure
const convert = (props, newObject) => {
  mapValues(props, (prop, key) => {
    if (isObject(prop.value)) {
      newObject[key] = convert(prop.value, {});
      return;
    }
    newObject[key] = prop.value;
  });
  return newObject;
};

const variationsToProps = (variations) => (
  mapValues(variations, (variation) => {
    const variationAsCode = parse(variation);
    return convert(variationAsCode, {}, {});
  }
));

export default variationsToProps;

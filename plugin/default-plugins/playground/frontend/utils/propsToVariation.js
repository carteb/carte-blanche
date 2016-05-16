import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import values from 'lodash/values';
import repeat from 'lodash/repeat';
import isString from 'lodash/isString';

const BASE_LEVEL = 2;
const SPACES_PER_LEVEL = 2;

const getArrayValues = (array) => (
  array.map((value, index) => {
    if (index !== array.length - 1) {
      return `${value}, `;
    }
    return `${value}`;
  })
);

const convert = (props, level) => {
  const spacesCount = ((level + 1) * SPACES_PER_LEVEL) + BASE_LEVEL;
  const spaces = repeat(' ', spacesCount);

  return values(mapValues(props, (prop, key) => {
    let value;
    if (isPlainObject(prop)) {
      value = `{${convert(prop, level + 1).join('')}\n${spaces}}`;
    } else if (isArray(prop)) {
      value = `[${getArrayValues(prop).join('')}]`;
    } else {
      value = isString(prop) ? `'${prop}'` : prop;
    }
    return `\n${spaces}${key}: ${value},`;
  }));
};

const propsToVariation = (props) => `{\n  props: {${convert(props, 0).join('')}\n  },\n};`;

export default propsToVariation;

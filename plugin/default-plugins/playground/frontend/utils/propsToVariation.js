import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';
import values from 'lodash/values';
import repeat from 'lodash/repeat';
import isString from 'lodash/isString';

const BASE_LEVEL = 2;
const SPACES_PER_LEVEL = 2;

const convert = (props, level) => {
  const spacesCount = ((level + 1) * SPACES_PER_LEVEL) + BASE_LEVEL;
  const spaces = repeat(' ', spacesCount);

  return values(mapValues(props, (prop, key) => {
    if (isObject(prop)) return convert(prop, level + 1);
    const value = isString(prop) ? `'${prop}'` : prop;
    const result = `\n${spaces}${key}: {\n${spaces}  value: ${value},\n${spaces}},`;
    return result;
  }));
};

const propsToVariation = (props) => `{\n  props: {${convert(props, 0).join('')}\n  },\n};`;

export default propsToVariation;

import forEach from 'lodash/forEach';
import uniqueId from 'lodash/uniqueId';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';

const propsToVariation = (rawProps) => {
  const functionStore = {};
  const props = { ...rawProps };
  const extractAndReplaceFunctions = (object) => {
    forEach(object, (value, key) => {
      if (isFunction(value)) {
        const id = uniqueId('CARTE_BLANCHE_FUNCTION_');
        functionStore[id] = value.toString();
        object[key] = id; // eslint-disable-line no-param-reassign
      } else if (isObject(value)) {
        extractAndReplaceFunctions(value);
      }
    });
  };

  extractAndReplaceFunctions(props);
  let stringifiedProps = `${JSON.stringify({ props }, null, 2)};`;
  forEach(functionStore, (functionSource, id) => {
    stringifiedProps = stringifiedProps.replace(`"${id}"`, functionSource);
  });
  return stringifiedProps;
};

export default propsToVariation;

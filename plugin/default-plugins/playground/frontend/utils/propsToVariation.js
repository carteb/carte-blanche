import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import uniqueId from 'lodash/uniqueId';

const propsToVariation = (rawProps) => {
  const functionStore = {};

  const props = mapValues(rawProps, (value) => {
    if (typeof value === 'function') {
      const id = uniqueId('STYLEGUIDE_FUNCTION_');
      functionStore[id] = value.toString();
      return id;
    }

    return value;
  });
  let stringifiedProps = `${JSON.stringify({ props }, null, 2)};`;
  forEach(functionStore, (functionSource, id) => {
    stringifiedProps = stringifiedProps.replace(`"${id}"`, functionSource);
  });
  return stringifiedProps;
};

export default propsToVariation;

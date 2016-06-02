import uniq from 'lodash/uniq';

const getPropKeys = (constraints, parsedMetadata) => {
  let propKeys = [];
  if (constraints.props) {
    propKeys = propKeys.concat(Object.keys(constraints.props));
  }
  if (parsedMetadata && parsedMetadata.value) {
    propKeys = propKeys.concat(Object.keys(parsedMetadata.value));
  }
  return uniq(propKeys).sort();
};

export default getPropKeys;

import uniq from 'lodash/uniq';

const getPropKeys = (customMetadata, parsedMetadata) => {
  let propKeys = [];
  if (customMetadata.props) {
    propKeys = propKeys.concat(Object.keys(customMetadata.props));
  }
  if (parsedMetadata.props) {
    propKeys = propKeys.concat(Object.keys(parsedMetadata.props));
  }
  return uniq(propKeys).sort();
};

export default getPropKeys;

import has from 'lodash/has';

const getControlType = (customMetadata, parsedMetadata, propKey) => {
  // expects either a custom control type or a parsed type name
  if (has(customMetadata, ['props', propKey, 'controlType'])) {
    return customMetadata.props[propKey].controlType;
  }

  // no need to check if it exists since the propKey must be in one of both
  return parsedMetadata.props[propKey].name;
};

export default getControlType;

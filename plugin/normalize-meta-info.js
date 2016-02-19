const mapValues = require('lodash/mapValues');
const has = require('lodash/has');
const omit = require('lodash/omit');

const normalizeMetaInfo = (metaInformation) => {
  if (has(metaInformation, 'flowType')) {
    const newObject = {
      ...metaInformation,
      flowType: undefined,
      name: metaInformation.flowType.name,
      value: metaInformation.flowType.value,
    };
    delete newObject.flowType;
    return newObject;
  }

  if (has(metaInformation, 'type')) {
    const newObject = {
      ...metaInformation,
      type: undefined,
      name: metaInformation.type.name,
      value: metaInformation.type.value,
    };
    delete newObject.type;
    return newObject;
  }

  if (typeof metaInformation === 'object') {
    return mapValues(metaInformation, (entry) => {
      return normalizeMetaInfo(entry);
    });
  }

  return metaInformation;
};

module.exports = normalizeMetaInfo;

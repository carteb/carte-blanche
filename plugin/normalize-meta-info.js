const mapValues = require('lodash/mapValues');
const has = require('lodash/has');
const omit = require('lodash/omit');

const normalizeMetaInfo = (metaInformation) => {
  if (has(metaInformation, 'flowType')) {
    const newObject = {
      ...metaInformation,
      name: metaInformation.flowType.name,
      value: metaInformation.flowType.value,
    };
    return omit(newObject, 'flowType');
  }

  if (has(metaInformation, 'type')) {
    const newObject = {
      ...metaInformation,
      name: metaInformation.type.name,
      value: metaInformation.type.value,
    };
    return omit(newObject, 'type');
  }

  if (typeof metaInformation === 'object') {
    return mapValues(metaInformation, (entry) => {
      return normalizeMetaInfo(entry);
    });
  }

  return metaInformation;
};

module.exports = normalizeMetaInfo;

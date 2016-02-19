const mapValues = require('lodash/mapValues');
const has = require('lodash/has');

const normalizeMetaInfo = (metaInformation) => {
  if (has(metaInformation, 'flowType')) {
    return {
      ...metaInformation,
      name: metaInformation.flowType.name,
      value: metaInformation.flowType.value,
    };
  }

  if (has(metaInformation, 'type')) {
    return {
      ...metaInformation,
      name: metaInformation.type.name,
      value: metaInformation.type.value,
    };
  }

  if (typeof metaInformation === 'object') {
    return mapValues(metaInformation, (entry) => {
      return normalizeMetaInfo(entry);
    });
  }
};

module.exports = normalizeMetaInfo;

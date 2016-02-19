const mapValues = require('lodash/mapValues');
const has = require('lodash/has');
const omit = require('lodash/omit');

const normalizeMetaInfo = (metaInformation) => {
  // there can be the case where a property is `flowType` and therefor we need to
  // check if flowType contains name
  const hasFlowType = (has(metaInformation, 'flowType') && has(metaInformation, ['flowType', 'name']));
  if (hasFlowType) {
    const info = {
      ...metaInformation,
      name: metaInformation.flowType.name,
      value: metaInformation.flowType.value,
    };
    if (info.name === 'signature') {
      info.signature = metaInformation.flowType.signature;
    }

    return omit(info, 'flowType');
  }

  // there can be the case where a property is `type` and therefor we need to
  // check if type contains name
  const hasType = (has(metaInformation, 'type') && has(metaInformation, ['type', 'name']));
  if (hasType) {
    const info = {
      ...metaInformation,
      name: metaInformation.type.name,
      value: metaInformation.type.value,
    };
    return omit(info, 'type');
  }

  if (typeof metaInformation === 'object') {
    return mapValues(metaInformation, (entry) => {
      return normalizeMetaInfo(entry);
    });
  }

  return metaInformation;
};

module.exports = normalizeMetaInfo;

function forIn(object, callback) {
  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue;
    }

    callback(key);
  }
}

function normalize(metaInformation) {
  const normalized = {};

  forIn(metaInformation, function cb(key) {
    if (Array.isArray(metaInformation[key])) {
      // Normalize nested arrays
      normalized[key] = [];
      for (let i = 0; i < metaInformation[key].length; i++) {
        normalized[key][i] = normalize(metaInformation[key][i]);
      }
    } else if (typeof metaInformation[key] === 'object') {
      // Normalize nested objects
      if (key === 'flowType') {
        // Replace 'flowType' with 'type'
        normalized.type = normalize(metaInformation[key]);
        return;
      }

      normalized[key] = normalize(metaInformation[key]);
      return;
    }

    normalized[key] = metaInformation[key];
  });

  return normalized;
}

module.exports = normalize;

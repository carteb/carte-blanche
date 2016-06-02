/**
 *
 *
 * convert the customMetaData to propTypeData structure
 *
 * from:
 *
 * {
 *    controlType: 'foo',
 *    constraints: {
 *      controlType: 'bar'
 *    }
 * }
 *
 *
 * to:
 *
 * {
 *    name: 'foo',
 *    value: {
 *      name: 'bar'
 *    }
 * }
 *
 * @param {Object} meta
 * @returns {{name: *}}
 */
const convertCustomMetaDataStructure = meta => {
  if (!meta || !meta.controlType) return undefined;

  // not ideal. but make it work for now.
  // check for enum or shape and control types
  // min and max constraints are being neglected.
  // should be adapted to handle number constraints etc.
  if (meta.controlType === 'enum') {
    return { name: 'enum', value: [
      { value: 1, computed: false },
      { value: 2, computed: false },
      { value: 3, computed: false },
    ] };
  }

  if (meta.controlType === 'shape') {
    return { name: 'shape', value: {
      one: { name: 'string', required: false },
      two: { name: 'number', required: false },
      three: { name: 'integer', required: false },
    } };
  }

  return { name: meta.controlType, value: convertCustomMetaDataStructure(meta.constraints) };
};

export default convertCustomMetaDataStructure;

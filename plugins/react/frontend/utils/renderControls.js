import { cloneElement } from 'react';
import createFragment from 'react-addons-create-fragment';
import set from 'lodash/set';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';

/*
 * Returns a ReactFragment containing all rendered controls.
 */
const renderControls = (
  metadataWithControls,
  globalComponentProps,
  setGlobalComponentProps,
  nestedLevel = 0,
) => {
  const updatePropertyValues = (path, value) => {
    const values = set(globalComponentProps, path, value);
    setGlobalComponentProps(values);
  };

  const controls = mapValues(metadataWithControls, (prop, keyPath) => {
    const props = {
      label: keyPath,
      secondaryLabel: prop.controlType ? `${prop.controlType} (${prop.name})` : prop.name,
      value: get(globalComponentProps, keyPath),
      onUpdate: ({ value }) => updatePropertyValues(keyPath, value),
      nestedLevel,
      customMetaData: prop.customMetaData,
    };
    return cloneElement(prop.control, props);
  });
  return createFragment(controls);
};

export default renderControls;

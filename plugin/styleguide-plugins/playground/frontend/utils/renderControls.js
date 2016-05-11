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
  keyPath = []
) => {
  const updatePropertyValues = (path, value) => {
    const values = set(globalComponentProps, path.join('.'), value);
    setGlobalComponentProps(values);
  };

  const controls = mapValues(metadataWithControls, (prop, key) => {
    const newKeyPath = keyPath.slice();
    newKeyPath.push(key);

    const props = {
      label: key,
      value: get(globalComponentProps, newKeyPath.join('.')),
      onUpdate: ({ value }) => updatePropertyValues(newKeyPath, value),
    };
    return cloneElement(prop.control, props);
  });
  return createFragment(controls);
};

export default renderControls;

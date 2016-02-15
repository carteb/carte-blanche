import { cloneElement } from 'react';
import createFragment from 'react-addons-create-fragment';
import { mapValues, get, set } from 'lodash';

/*
 * Returns a ReactFragment containing all rendered controls.
 */
const renderControls = (properties, componentProperties, setComponentProperties, keyPath = []) => {
  const updatePropertyValues = (path, value) => {
    const values = set(componentProperties, path.join('.'), value);
    setComponentProperties(values);
  };

  const controls = mapValues(properties, (prop, key) => {
    const newKeyPath = keyPath.slice();
    newKeyPath.push(key);

    // render control with props
    const props = {
      label: key,
      value: get(componentProperties, newKeyPath.join('.')),
      onUpdate: ({ value }) => updatePropertyValues(newKeyPath, value),
    };
    return cloneElement(prop.control, props);
  });
  return createFragment(controls);
};

export default renderControls;

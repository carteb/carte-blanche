import React, { cloneElement, isValidElement } from 'react';
import createFragment from 'react-addons-create-fragment';
import { mapValues, get, set } from 'lodash';

/*
 * Returns a ReactFragment containing all rendered controls.
 */
const renderControls = (metadataWithControls, globalComponentProps, setGlobalComponentProps, keyPath = []) => {
  const updatePropertyValues = (path, value) => {
    const values = set(globalComponentProps, path.join('.'), value);
    setGlobalComponentProps(values);
  };

  const controls = mapValues(metadataWithControls, (prop, key) => {
    const newKeyPath = keyPath.slice();
    newKeyPath.push(key);

    // TODO check with shape instead of non existing control
    // render control with props
    if (isValidElement(prop.control)) {
      const props = {
        label: key,
        value: get(globalComponentProps, newKeyPath.join('.')),
        onUpdate: ({ value }) => updatePropertyValues(newKeyPath, value),
      };
      return cloneElement(prop.control, props);
    }

    // render nested object
    return (
      <div>
        <div style={{ height: 30 }}>{key}: {'{'}</div>
          <div style={{ paddingLeft: 10 }}>
            {renderControls(prop.value, globalComponentProps, setGlobalComponentProps, newKeyPath)}
          </div>
        <div>{'}'}</div>
      </div>
    );
  });
  return createFragment(controls);
};

export default renderControls;

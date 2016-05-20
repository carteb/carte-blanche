import React from 'react';

import styles from './styles.css';
import Select from '../common/Select';
import controlTypes from './controlTypes';
import getControl from '../../utils/getControl';
import uniq from 'lodash/uniq';

function renderConstraintForm(propKey, controlType, updateCustomMetadata, customMetadata) {
  // retrieving the ConstraintsForm based on the controlType string/key
  const control = getControl({ name: controlType });
  const ConstraintsForm = control.type.ConstraintsForm;
  if (!ConstraintsForm) return null;

  // create an update function that simply overwrites the updated constraints
  const onUpdateConstraints = (constraintChanges) => {
    const newCustomMetadata = { ...customMetadata };
    newCustomMetadata.props[propKey].constraints = {
      ...newCustomMetadata.props[propKey].constraints,
      ...constraintChanges,
    };
    updateCustomMetadata(newCustomMetadata);
  };

  return (
    <ConstraintsForm
      onUpdate={onUpdateConstraints}
      constraints={customMetadata.props[propKey].constraints}
    />
  );
}

function CustomMetadataForm(props) {
  // retriev all propKeys from the parsed & custom metadata
  let propKeys = [];
  if (props.customMetadata.props) {
    propKeys = propKeys.concat(Object.keys(props.customMetadata.props));
  }
  if (props.parsedMetadata.props) {
    propKeys = propKeys.concat(Object.keys(props.parsedMetadata.props));
  }
  propKeys = uniq(propKeys);

  return (
    <div className={styles.wrapper}>
      {
        propKeys.map((propKey) => {
          let controlType;
          if (props.customMetadata.props && props.customMetadata.props[propKey]) {
            controlType = props.customMetadata.props[propKey].controlType;
          } else {
            controlType = props.parsedMetadata.props[propKey].name;
          }

          return (
            <div key={propKey}>
              <Select
                label={propKey}
                value={controlType}
                onChange={(event) => {
                  const newCustomMetadata = { ...props.customMetadata };
                  newCustomMetadata.props = newCustomMetadata.props ?
                                            newCustomMetadata.props :
                                            {};
                  newCustomMetadata.props[propKey] = newCustomMetadata.props[propKey] ?
                                                     newCustomMetadata.props[propKey] :
                                                     {};
                  newCustomMetadata.props[propKey].controlType = event.target.value;
                  props.updateCustomMetadata(newCustomMetadata);
                }}
                options={controlTypes.map((type) => ({ value: type }))}
              />
            {renderConstraintForm(
              propKey,
              controlType,
              props.updateCustomMetadata,
              props.customMetadata
            )}
            </div>
          );
        })
      }
    </div>
  );
}

export default CustomMetadataForm;

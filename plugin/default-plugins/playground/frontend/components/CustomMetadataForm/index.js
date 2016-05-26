import React from 'react';

import styles from './styles.css';
import Select from '../common/Select';
import controlTypes from './controlTypes';
import getControl from '../../utils/getControl';
import uniq from 'lodash/uniq';
import set from 'lodash/set';
import has from 'lodash/has';

function renderConstraintForm(
  propKey,
  controlType,
  updateCustomMetadata,
  customMetadata,
  parsedMetadata
) {
  // retrieving the ConstraintsForm based on the controlType string/key
  const control = getControl({ name: controlType });
  const ConstraintsForm = control.type.ConstraintsForm;
  if (!ConstraintsForm) return null;

  const relevantParsedMetadata = parsedMetadata &&
    parsedMetadata.props &&
    parsedMetadata.props[propKey] ?
    parsedMetadata.props[propKey] :
    undefined;

  const relevantCustomMetadata = has(customMetadata, ['props', propKey]) ?
    customMetadata.props[propKey] :
    {};

  // create an update function that simply overwrites the updated constraints
  const onUpdateConstraints = (constraintChanges) => {
    const newCustomMetadata = { ...customMetadata };
    if (!has(newCustomMetadata, ['props', propKey])) {
      set(newCustomMetadata, ['props', propKey], {});
    }
    newCustomMetadata.props[propKey].constraints = {
      ...newCustomMetadata.props[propKey].constraints,
      ...constraintChanges,
    };
    updateCustomMetadata(newCustomMetadata);
  };

  const constraints = relevantCustomMetadata.constraints ?
                      relevantCustomMetadata.constraints :
                      {};

  return (
    <ConstraintsForm
      onUpdate={onUpdateConstraints}
      constraints={constraints}
      parsedMetadata={relevantParsedMetadata}
      customMetadata={relevantCustomMetadata}
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
      <h2 className={styles.title}>Edit Metadata</h2>
      {
        propKeys.map((propKey) => {
          let controlType;
          if (has(props.customMetadata, ['props', propKey, 'controlType'])) {
            controlType = props.customMetadata.props[propKey].controlType;
          } else {
            controlType = props.parsedMetadata.props[propKey].name;
          }

          return (
            <div key={propKey}>
              <div className={styles.propLabel}>
                {propKey}
              </div>
              <Select
                label={has(props.parsedMetadata, ['props', propKey, 'name']) ?
                 props.parsedMetadata.props[propKey].name :
                 'Not defined'}
                value={controlType}
                onChange={(event) => {
                  const newCustomMetadata = { ...props.customMetadata };
                  // overwrite they current propKey which also removes constraints
                  set(newCustomMetadata, ['props', propKey], {});
                  newCustomMetadata.props[propKey].controlType = event.target.value;
                  props.updateCustomMetadata(newCustomMetadata);
                }}
                options={controlTypes.map((type) => ({ value: type }))}
              />
            {renderConstraintForm(
              propKey,
              controlType,
              props.updateCustomMetadata,
              props.customMetadata,
              props.parsedMetadata
            )}
            </div>
          );
        })
      }
    </div>
  );
}

export default CustomMetadataForm;

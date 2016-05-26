import React from 'react';
import styles from './styles.css';
import Select from '../../../../common/Select';
import set from 'lodash/set';
import has from 'lodash/has';
import uniq from 'lodash/uniq';
import controlTypes from '../../../../CustomMetadataForm/controlTypes';
import getControl from '../../../../../utils/getControl';

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

  const relevantParsedMetadata = has(parsedMetadata, ['value', propKey]) ?
    parsedMetadata.value[propKey] :
    undefined;

  const relevantCustomMetadata = has(customMetadata, ['props', propKey]) ?
    customMetadata.props[propKey] :
    undefined;

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

  const constraints = {};

  return (
    <ConstraintsForm
      onUpdate={onUpdateConstraints}
      constraints={constraints}
      parsedMetadata={relevantParsedMetadata}
      customMetadata={relevantCustomMetadata}
    />
  );
}

export default (props) => {
  // retriev all propKeys from the parsed & custom metadata
  let propKeys = [];
  if (has(props.customMetadata, ['constraints', 'props'])) {
    propKeys = propKeys.concat(Object.keys(props.customMetadata.constraints.props));
  }
  if (props.parsedMetadata.value) {
    propKeys = propKeys.concat(Object.keys(props.parsedMetadata.value));
  }
  propKeys = uniq(propKeys);

  return (
    <div className={styles.wrapper}>
      {
        propKeys.map((propKey) => {
          let controlType;
          if (has(props.customMetadata, ['constraints', 'props', propKey, 'controlType'])) {
            controlType = props.customMetadata.constraints.props[propKey].controlType;
          } else {
            controlType = props.parsedMetadata.value[propKey].name;
          }
          return (
            <div key={propKey}>
              <div className={styles.propLabel}>
                {propKey}
              </div>
              <Select
                label={has(props.parsedMetadata, ['value', propKey, 'name']) ?
                 props.parsedMetadata.value[propKey].name :
                 'Not defined'}
                value={controlType}
                onChange={(event) => {
                  const newCustomMetadata = { ...props.customMetadata };
                  // overwrite they current propKey which also removes constraints
                  set(newCustomMetadata, ['props', propKey], {});
                  newCustomMetadata.props[propKey].controlType = event.target.value;
                  props.onUpdate(newCustomMetadata);
                }}
                options={controlTypes.map((type) => ({ value: type }))}
              />
            {renderConstraintForm(
              propKey,
              controlType,
              props.onUpdate,
              props.customMetadata,
              props.parsedMetadata
            )}
            </div>
          );
        })
      }
    </div>
  );
};

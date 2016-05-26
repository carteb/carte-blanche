import React from 'react';
import styles from './styles.css';
import Select from '../../../../common/Select';
import set from 'lodash/set';
import controlTypes from '../../../../CustomMetadataForm/controlTypes';
import getControl from '../../../../../utils/getControl';
// import Input from '../../../../common/Input';

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

  // console.log(parsedMetadata);
  // console.log(JSON.stringify(parsedMetadata));

  // create an update function that simply overwrites the updated constraints
  const onUpdateConstraints = (constraintChanges) => {
    const newCustomMetadata = { ...customMetadata };
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
      parsedMetadata={parsedMetadata}
    />
  );
}

export default (props) => {
  // retriev all propKeys from the parsed & custom metadata
  let propKeys = [];
  // if (props.customMetadata.props) {
  //   propKeys = propKeys.concat(Object.keys(props.customMetadata.props));
  // }
  if (props.parsedMetadata.value) {
    propKeys = propKeys.concat(Object.keys(props.parsedMetadata.value));
  }

  return (
    <div className={styles.wrapper}>
      {
        propKeys.map((propKey) => {
          let controlType;

          controlType = props.parsedMetadata.value[propKey].name;

          const relevantParsedMetadata = props.parsedMetadata &&
            props.parsedMetadata.value &&
            props.parsedMetadata.value[propKey] ?
            props.parsedMetadata.value[propKey] :
            undefined;

          return (
            <div key={propKey}>
              <div className={styles.propLabel}>
                {propKey}
              </div>
              <Select
                label={props.parsedMetadata &&
                  props.parsedMetadata.value &&
                 props.parsedMetadata.value[propKey].name ?
                 props.parsedMetadata.value[propKey].name :
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
              relevantParsedMetadata
            )}
            </div>
          );
        })
      }
    </div>
  );
};

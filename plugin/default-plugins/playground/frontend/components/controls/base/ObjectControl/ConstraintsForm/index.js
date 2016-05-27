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
  constraints,
  parsedMetadata
) {
  // retrieving the ConstraintsForm based on the controlType string/key
  const control = getControl({ name: controlType });
  const ConstraintsForm = control.type.ConstraintsForm;
  if (!ConstraintsForm) return null;

  const relevantParsedMetadata = has(parsedMetadata, ['value', propKey]) ?
    parsedMetadata.value[propKey] :
    undefined;

  const nestedConstraints = has(constraints, ['props', propKey, 'constraints']) ?
    constraints.props[propKey].constraints :
    {};

  // create an update function that simply overwrites the updated constraints
  const onUpdateConstraints = (newConstraint) => {
    console.log('constraintChanges', { ...newConstraint });
    const newCustomMetadata = {};
    console.log('newCustomMetadata', { ...newCustomMetadata });
    if (!has(newCustomMetadata, ['props', propKey])) {
      set(newCustomMetadata, ['props', propKey], {});
    }
    newCustomMetadata.props[propKey].constraints = newConstraint;
    updateCustomMetadata(newCustomMetadata);
  };

  return (
    <ConstraintsForm
      onUpdate={onUpdateConstraints}
      constraints={nestedConstraints}
      parsedMetadata={relevantParsedMetadata}
    />
  );
}

export default (props) => {
  /*
    constraints: {
      props: {
        a: …
      }
    }


    parsedMetadata: {
      value: {
        a: …
      }
    }
  */

  console.log('a', props.constraints);
  console.log('b', props.parsedMetadata);

  // retriev all propKeys from the parsed & custom metadata
  let propKeys = [];
  if (props.constraints.props) {
    propKeys = propKeys.concat(Object.keys(props.constraints.props));
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
          if (has(props.constraints, ['props', propKey, 'controlType'])) {
            console.log('in x');
            controlType = props.constraints.props[propKey].controlType;
          } else {
            console.log('in y');
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
                  console.log('constraints', { ...props.constraints.props });
                  // take existing constraints.props
                  const newCustomMetadata = has(props, ['constraints', 'props']) ?
                    { ...props.constraints.props } :
                    {};

                  console.log('newCustomMetadata', { ...newCustomMetadata });
                  // set an empty object for the wanted key to
                  //  which also removes inner constraints in case they exist
                  set(newCustomMetadata, [propKey], {});
                  newCustomMetadata[propKey].controlType = event.target.value;
                  // give back the props list
                  props.onUpdate({ props: newCustomMetadata });
                }}
                options={controlTypes.map((type) => ({ value: type }))}
              />
            {renderConstraintForm(
              propKey,
              controlType,
              props.onUpdate,
              props.constraints,
              props.parsedMetadata
            )}
            </div>
          );
        })
      }
    </div>
  );
};

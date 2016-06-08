import React from 'react';
import getControl from '../../utils/getControl';
import has from 'lodash/has';
import set from 'lodash/set';

const renderConstraintForm = (
  propKey,
  controlType,
  updateCustomMetadata,
  customMetadata,
  parsedMetadata
) => {
  // retrieving the ConstraintsForm based on the controlType string/key
  const control = getControl({ name: controlType });
  const ConstraintsForm = control.type.ConstraintsForm;
  if (!ConstraintsForm) return null;

  const relevantParsedMetadata = has(parsedMetadata, ['props', propKey]) ?
    parsedMetadata.props[propKey] :
    undefined;

  const constraints = has(customMetadata, ['props', propKey, 'constraints']) ?
    customMetadata.props[propKey].constraints :
    {};

  // updating the complete customMetadata object with only the constraints
  // of the desired property changed
  const onUpdateConstraints = (newConstraint) => {
    const newCustomMetadata = { ...customMetadata };
    if (!has(newCustomMetadata, ['props', propKey])) {
      set(newCustomMetadata, ['props', propKey], {});
    }
    newCustomMetadata.props[propKey].constraints = newConstraint;
    updateCustomMetadata(newCustomMetadata);
  };

  return (
    <ConstraintsForm
      parsedMetadata={relevantParsedMetadata}
      constraints={constraints}
      onUpdate={onUpdateConstraints}
      nestedLevel={0}
    />
  );
};

export default renderConstraintForm;

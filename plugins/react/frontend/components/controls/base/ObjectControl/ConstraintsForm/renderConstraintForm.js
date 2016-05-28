import React from 'react';
import getControl from '../../../../../utils/getControl';
import has from 'lodash/has';
import set from 'lodash/set';

const renderConstraintForm = (
  propKey,
  controlType,
  updateConstraints,
  constraints,
  parsedMetadata
) => {
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

  // updating the complete constraints object with only the nested constraints
  // object of the desired property changed
  const onUpdateConstraints = (newConstraint) => {
    const newCustomMetadata = { ...constraints };
    if (!has(newCustomMetadata, ['props', propKey])) {
      set(newCustomMetadata, ['props', propKey], {});
    }
    newCustomMetadata.props[propKey].constraints = newConstraint;
    updateConstraints(newCustomMetadata);
  };

  return (
    <ConstraintsForm
      onUpdate={onUpdateConstraints}
      constraints={nestedConstraints}
      parsedMetadata={relevantParsedMetadata}
    />
  );
};

export default renderConstraintForm;

import React from 'react';
import getControl from '../../../../../utils/getControl';

/**
 *
 * Takes care of rendering and updating the constraints for nested arrays
 *
 * @param controlType
 * @param updateConstraints
 * @param constraints
 * @param parsedMetadata
 * @returns {*}
 */
const renderConstraintForm = (
  controlType,
  updateConstraints,
  constraints,
  parsedMetadata
) => {
  const control = getControl({ name: controlType });
  const ConstraintsForm = control.type.ConstraintsForm;
  if (!ConstraintsForm) return null;

  const relevantParsedMetadata = parsedMetadata && parsedMetadata.value
    ? parsedMetadata.value
    : undefined;

  const nestedConstraints = constraints.constraints
    ? constraints.constraints
    : {};

  const onUpdateConstraints = (newConstraint) => {
    const newCustomMetadata = { ...constraints };
    newCustomMetadata.constraints = newConstraint;
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

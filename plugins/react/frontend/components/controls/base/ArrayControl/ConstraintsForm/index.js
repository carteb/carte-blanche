import React from 'react';
import Select from '../../../../common/Select';
import controlTypes from '../../../../CustomMetadataForm/controlTypes';
import getControl from '../../../../../utils/getControl';
import renderConstraintForm from './renderConstraintForm';
import styles from './styles.css';

/**
 *
 * Takes care of rendering of the selection & constraint form for nested arrays
 *
 * The props should have the following structure:
 *
 * constraints: {
 *    controlType: "arrayOf",
 *    constraints: {
 *      controlType: "string"
 *    }
 * }
 *
 * parsedMetadata: {
 *  name: "arrayOf",
 *  value: {
 *     name: "string"
 *   }
 * }
 *
 *
 * @param constraints
 * @param parsedMetadata
 * @param onUpdate
 * @returns {Object}
 * @constructor
 */
const ConstraintsForm = ({ constraints, parsedMetadata, onUpdate }) => {
  const onChange = (event) => {
    const controlType = event.target.value;
    // check if the control type has constraints
    // if the type doesn't have constraints neglect the existing constraints.
    const control = getControl({ name: controlType });
    const hasConstraints = control.type.ConstraintsForm;
    const newCustomMetadata = hasConstraints && constraints && constraints.constraints
      ? { ...constraints.constraints }
      : {};
    newCustomMetadata.controlType = controlType;
    onUpdate({ ...newCustomMetadata });
  };

  const renderControl = ({ controlType, constraint }) => (
    <div>
      <div className={styles.propLabel}>
      </div>
      <Select
        label={controlType}
        value={controlType}
        onChange={onChange}
        options={controlTypes.map((type) => ({ value: type }))}
      />
      {renderConstraintForm(
        controlType,
        onUpdate,
        constraints,
        parsedMetadata
      )}
      {constraint && renderControl(constraint)}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {renderControl(constraints)}
    </div>
  );
};

export default ConstraintsForm;

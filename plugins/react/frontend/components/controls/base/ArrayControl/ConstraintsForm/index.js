import React from 'react';
import controlTypes from '../../../../CustomMetadataForm/controlTypes';
import getControl from '../../../../../utils/getControl';
import renderConstraintForm from './renderConstraintForm';
import Row from '../../../../form/Grid/Row';
import LeftColumn from '../../../../form/Grid/LeftColumn';
import RightColumn from '../../../../form/Grid/RightColumn';
import ComboBox from '../../../../form/ComboBox';

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
const ConstraintsForm = ({ constraints, parsedMetadata, onUpdate, nestedLevel }) => {
  const onChange = (event) => {
    const controlType = event.value;
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

  const convertMetaDataToConstraints = prop => {
    if (!prop) return null;
    return { controlType: prop.name, constraints: convertMetaDataToConstraints(prop.value) };
  };

  const constraintData = Object.keys(constraints).length > 0
    ? constraints
    : convertMetaDataToConstraints(parsedMetadata.value);

  const renderControl = ({ controlType, constraint }) => (
    <Row>
      <LeftColumn nestedLevel={nestedLevel}>{controlType}</LeftColumn>
      <RightColumn>
        <ComboBox
          value={controlType}
          onChange={onChange}
          options={controlTypes.map((type) => ({ value: type }))}
        />
      </RightColumn>
      {renderConstraintForm(
        controlType,
        onUpdate,
        constraintData,
        parsedMetadata
      )}
      {constraint && renderControl(constraint)}
    </Row>
  );

  return renderControl(constraintData);
};

export default ConstraintsForm;

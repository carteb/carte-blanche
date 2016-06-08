import React from 'react';
import set from 'lodash/set';
import has from 'lodash/has';
import controlTypes from '../../../../CustomMetadataForm/controlTypes';
import renderConstraintForm from './renderConstraintForm';
import getPropKeys from './getPropKeys';
import getControlType from './getControlType';
import Row from '../../../../form/Grid/Row';
import LeftColumn from '../../../../form/Grid/LeftColumn';
import RightColumn from '../../../../form/Grid/RightColumn';
import ComboBox from '../../../../form/ComboBox';
import Label from '../../../../form/Label';

/*
 * Rendering the selection & constraintform for nested objects
 *
 * The props should look like this:
 * constraints: {
 *   props: {
 *     a: …
 *   }
 * }
 * parsedMetadata: {
 *   value: {
 *     a: …
 *   }
 * }
*/
const ConstraintsForm = (props) => {
  // retriev all propKeys from the parsed & custom metadata
  const propKeys = getPropKeys(props.constraints, props.parsedMetadata);
  const nestedLevel = props.nestedLevel + 1;

  return (
    <div>
      {
        propKeys.map((propKey) => {
          const controlType = getControlType(
            props.constraints,
            props.parsedMetadata,
            propKey
          );

          const propType = has(props.parsedMetadata, ['value', propKey, 'name']) ?
            props.parsedMetadata.value[propKey].name :
            'Not defined';

          // updating the complete props object with only the controlType
          // of the desired property changed and the constraints to be reset
          const onChange = (event) => {
            // take existing constraints.props
            const newCustomMetadata = has(props, ['constraints', 'props']) ?
              { ...props.constraints.props } :
              {};
            // set an empty object for the wanted key to
            // which also removes inner constraints in case they exist
            set(newCustomMetadata, [propKey], {});
            newCustomMetadata[propKey].controlType = event.value;
            // give back the props list
            props.onUpdate({ props: newCustomMetadata });
          };

          return (
            <Row>
              <LeftColumn nestedLevel={nestedLevel}>
                <Label
                  type={propType}
                  propKey={propKey}
                />
              </LeftColumn>
              <RightColumn>
                <ComboBox
                  value={controlType}
                  onChange={onChange}
                  options={controlTypes.map((type) => ({ value: type }))}
                />
              </RightColumn>
              {renderConstraintForm(
                propKey,
                controlType,
                props.onUpdate,
                props.constraints,
                props.parsedMetadata,
                nestedLevel
              )}
            </Row>
          );
        })
      }
    </div>
  );
};

export default ConstraintsForm;

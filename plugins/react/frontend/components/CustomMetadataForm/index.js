import React from 'react';
import styles from './styles.css';
import controlTypes from './controlTypes';
import set from 'lodash/set';
import has from 'lodash/has';
import getPropKeys from './getPropKeys';
import getControlType from './getControlType';
import renderConstraintForm from './renderConstraintForm';
import Row from '../form/Grid/Row';
import Grid from '../form/Grid';
import LeftColumn from '../form/Grid/LeftColumn';
import RightColumn from '../form/Grid/RightColumn';
import ComboBox from '../form/ComboBox';

const CustomMetadataForm = (props) => {
  // retriev all propKeys from the parsed & custom metadata
  const propKeys = getPropKeys(props.customMetadata, props.parsedMetadata);

  return (
    <Grid>
      <h2 className={styles.title}>Edit Metadata</h2>
      {
        propKeys.map((propKey) => {
          const controlType = getControlType(
            props.customMetadata,
            props.parsedMetadata,
            propKey
          );

          const propType = has(props.parsedMetadata, ['props', propKey, 'name']) ?
            props.parsedMetadata.props[propKey].name :
            'Not defined';

          // updating the complete customMetadata object with only the controlType
          // of the desired property changed and the constraints to be reset
          const onChange = (event) => {
            const newCustomMetadata = { ...props.customMetadata };
            // overwrite they current propKey which also removes constraints
            set(newCustomMetadata, ['props', propKey], {});
            newCustomMetadata.props[propKey].controlType = event.target.value;
            props.updateCustomMetadata(newCustomMetadata);
          };

          return (
            <Row>
              <LeftColumn>{propKey} ({propType})</LeftColumn>
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
                props.updateCustomMetadata,
                props.customMetadata,
                props.parsedMetadata
              )}
            </Row>
          );
        })
      }
    </Grid>
  );
};

export default CustomMetadataForm;

import React from 'react';

import renderControls from '../../utils/renderControls';
import RandomButton from '../common/RandomButton';
import Grid from '../form/Grid';
import Row from '../form/Grid/Row';
import LeftColumn from '../form/Grid/LeftColumn';
import RightColumn from '../form/Grid/RightColumn';

function PropForm(props) {
  return (
    <div style={{ width: '100%' }}>
      <Grid>
        <Row>
          <LeftColumn>
            <h2>Props</h2>
          </LeftColumn>
          <RightColumn>
            <RandomButton onClick={props.onRandomClick} />
            {props.saving && <div>Saving...</div>}
          </RightColumn>
        </Row>
        {renderControls(
          props.metadataWithControls,
          props.variationProps,
          (newProps) => (props.onVariationPropsChange(props.variationPath, newProps))
        )}
      </Grid>
    </div>
  );
}

export default PropForm;

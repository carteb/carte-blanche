import React from 'react';

import renderControls from '../../utils/renderControls';
import RandomButton from '../form/RandomButton';
import Grid from '../form/Grid';
import Row from '../form/Grid/Row';
import LeftColumn from '../form/Grid/LeftColumn';
import RightColumn from '../form/Grid/RightColumn';
import SavingLabel from '../common/SavingLabel';
import styles from './styles.css';

function PropForm(props) {
  return (
    <div style={{ width: '100%' }}>
      <Grid>
        <Row>
          <LeftColumn>
            <h2>Props</h2>
          </LeftColumn>
          <RightColumn>
            <RandomButton
              onClick={props.onRandomClick}
              className={styles.randomButton}
              groupType={'none'}
            />
            {props.saving && <SavingLabel />}
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

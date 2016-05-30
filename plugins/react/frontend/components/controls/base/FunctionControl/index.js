/**
 * FunctionControl
 */

import React from 'react';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import Label from '../../../form/Label';
import styles from './styles.css';

const FunctionControl = ({ label, secondaryLabel, nestedLevel }) => (
  <Row>
    <LeftColumn nestedLevel={nestedLevel}>
      <Label
        type={secondaryLabel}
        propKey={label}
      />
    </LeftColumn>
    <RightColumn>
      <div className={styles.info}>
        {'function() { console.log(\'Run\') }'}
      </div>
    </RightColumn>
  </Row>
);

FunctionControl.randomValue = () => () => {
  console.log('Run') // eslint-disable-line
};

export default FunctionControl;

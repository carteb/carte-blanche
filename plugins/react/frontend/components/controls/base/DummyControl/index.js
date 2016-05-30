/**
 * DummyControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import React from 'react';
import Row from '../../../form/Grid/Row';
import LeftColumn from '../../../form/Grid/LeftColumn';
import RightColumn from '../../../form/Grid/RightColumn';
import Label from '../../../form/Label';
import styles from './styles.css';

const DummyControl = ({ label, secondaryLabel, nestedLevel }) => (
  <Row>
    <LeftColumn nestedLevel={nestedLevel}>
      <Label
        type={secondaryLabel}
        propKey={label}
      />
    </LeftColumn>
    <RightColumn>
      <div className={styles.info}>
        No Control available for this prop type.
      </div>
    </RightColumn>
  </Row>
);

DummyControl.randomValue = () => undefined;

export default DummyControl;

import React from 'react';

import renderControls from '../../utils/renderControls';
import styles from './styles.css';

function PropForm(props) {
  return (
    <div className={styles.controls}>
      {renderControls(
        props.metadataWithControls,
        props.variationProps,
        (newProps) => (props.onVariationPropsChange(props.variationPath, newProps))
      )}
    </div>
  );
}

export default PropForm;

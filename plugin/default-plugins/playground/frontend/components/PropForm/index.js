import React from 'react';

import renderControls from '../../utils/renderControls';
import styles from './styles.css';

function PropForm(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Props</h2>
      </div>
      <div className={styles.controls}>
        {renderControls(
          props.metadataWithControls,
          props.variationProps,
          (newProps) => (props.onVariationPropsChange(props.variationPath, newProps))
        )}
      </div>
    </div>
  );
}

export default PropForm;

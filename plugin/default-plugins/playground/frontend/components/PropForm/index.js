import React from 'react';

import renderControls from '../../utils/renderControls';
import styles from './styles.css';

function PropForm(props) {
  return (
    <div
      className={
        (props.open) ?
        styles.wrapper :
        styles.wrapperClosed
      }
    >
      <div className={styles.header}>
        <button
          className={styles.closeBtn}
          onClick={props.onCloseClick}
        >
          <svg
            className={styles.closeBtnSvg}
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              fill="none"
            >
              <path d="M.5.5l23 23M23.5.5l-23 23" />
            </g>
          </svg>
        </button>
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

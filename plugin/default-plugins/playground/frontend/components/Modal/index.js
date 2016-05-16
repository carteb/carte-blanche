import React, { PropTypes } from 'react';
import { VelocityComponent } from 'velocity-react';

import styles from './styles.css';

const ANIMATION_DURATION = 150;
const ANIMATION_EASING = 'ease-in-out';

function Modal(props) {
  return (
    <div>
      <VelocityComponent
        animation={{
          opacity: props.visible ? 1 : 0,
          translateZ: 0, // Force hardware acceleration by animating a 3D property
        }}
        display={(props.visible) ? 'block' : 'none'}
        duration={ANIMATION_DURATION}
        easing={ANIMATION_EASING}
        runOnMount
      >
        <div
          className={styles.modalBackground}
          onClick={props.onCloseClick}
        />
      </VelocityComponent>
      <VelocityComponent
        animation={{
          opacity: props.visible ? 1 : 0,
          scaleX: props.visible ? 1 : 0.95,
          scaleY: props.visible ? 1 : 0.95,
          translateZ: 0, // Force hardware acceleration by animating a 3D property
        }}
        display={(props.visible) ? 'block' : 'none'}
        duration={ANIMATION_DURATION}
        easing={ANIMATION_EASING}
        runOnMount
      >
        <div className={styles.modal}>
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
          {props.children}
        </div>
      </VelocityComponent>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default Modal;

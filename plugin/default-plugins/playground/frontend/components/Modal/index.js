import React, { PropTypes } from 'react';
import { VelocityComponent } from 'velocity-react';

import styles from './styles.css';

function Modal(props) {
  return (
    <VelocityComponent
      animation={{
        display: props.visible ? 'block' : 'none',
        opacity: props.visible ? 1 : 0,
        scaleX: props.visible ? 1 : 0.95,
        scaleY: props.visible ? 1 : 0.95,
        translateZ: 0, // Force hardware acceleration by animating a 3D property
      }}
      duration={150}
      easing="ease-in-out"
    >
      <div className={styles.modalBackground}>
        <div className={styles.modal}>
          {props.children}
        </div>
      </div>
    </VelocityComponent>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
};

export default Modal;

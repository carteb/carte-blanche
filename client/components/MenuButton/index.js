/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import styles from './styles.css';

function MenuButton(props) {
  return (
    <button
      className={(props.drawerOpen) ? styles.buttonOpenDrawer : styles.button}
      onClick={props.onClick}
    >
      <svg className={styles.svg} x="0px" y="0px" width="1.5em" height="1.5em" viewBox="0 0 24 24" enable-background="new 0 0 24 24" aria-label="Open navigation">
        <g id="Filled_Icons_1_">
          <g id="Filled_Icons">
            <g>
              <path d="M4.043,7H19c0.553,0,1-0.448,1-1c0-0.552-0.447-1-1-1H4.043c-0.553,0-1,0.448-1,1C3.043,6.552,3.49,7,4.043,7z" />
              <path d="M19,9H4.043c-0.553,0-1,0.448-1,1c0,0.552,0.447,1,1,1H19c0.553,0,1-0.448,1-1C20,9.448,19.553,9,19,9z" />
              <path d="M19,13H4.043c-0.553,0-1,0.448-1,1c0,0.552,0.447,1,1,1H19c0.553,0,1-0.448,1-1C20,13.448,19.553,13,19,13z" />
              <path d="M19,17H4.043c-0.553,0-1,0.448-1,1c0,0.552,0.447,1,1,1H19c0.553,0,1-0.448,1-1C20,17.448,19.553,17,19,17z" />
            </g>
          </g>
          <g id="New_icons">
          </g>
        </g>
      </svg>
    </button>
  );
}

MenuButton.propTypes = {
  drawerOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default MenuButton;

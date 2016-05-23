import React from 'react';
import ReactDOM from 'react-dom';

import Profile from './components/Profile/index.js';
import styles from './styles';

ReactDOM.render(
  <div style={styles.wrapper}>
    <style>{`
      html,
      body,
      #root {
        width: 100%;
        height: 100%;
        background-color: #f4f7f9;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }
    `}</style>
    <Profile
      avatarUrl="https://pbs.twimg.com/profile_images/681114454029942784/PwhopfmU.jpg"
      firstName="Max"
      lastName="Stoiber"
      username="mxstbr"
      bio="I travel around the world, brew coffee, ski mountains and make stuff on the web. Open source developer advocate (@KeystoneJS @ElementalUI), part of @reactvienna." // eslint-disable-line max-len
    />
  </div>,
  document.getElementById('root')
);

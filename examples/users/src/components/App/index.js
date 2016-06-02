/* eslint-disable max-len */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

class App extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { avatarUrl } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.navigation}>
          <Link to={'/'} className={styles.logo}>
            <svg className={styles.logoSvg} viewBox="0 0 42 42" version="1.1">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                <g
                  id="Group-Copy"
                  transform="translate(1.000000, 1.000000)"
                  stroke="#61DDB2"
                  strokeWidth="2"
                >
                  <circle cx="20" cy="20" r="20" />
                  <circle cx="20" cy="18.5" r="8.5" />
                  <path d="M5.5,33.2078568 C5.5,33.2078568 6.2155524,29.1233024 7.95201448,27.1300106 C9.68847656,25.1367188 13.8769531,25.1367188 13.8769531,25.1367188" strokeLinecap="square" />
                  <path d="M26,33.2078568 C26,33.2078568 26.7155524,29.1233024 28.4520145,27.1300106 C30.1884766,25.1367188 34.3769531,25.1367188 34.3769531,25.1367188" strokeLinecap="square" transform="translate(30.188477, 29.172288) scale(-1, 1) translate(-30.188477, -29.172288) " />
                </g>
              </g>
            </svg>
            <span className={styles.logoTitle}>Contacts</span>
          </Link>
          <div className={styles.user}>
            <img src={avatarUrl} height="25" width="25" role="presentation" />
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
        <div>
          The design was inspired by <a href="https://dribbble.com/shots/2750926-Home-Care-App-Icons">Jon McClure</a>
        </div>
      </div>
    );
  }
}

export default App;

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
          <Link to={'/'}>Logo</Link>
          <img src={avatarUrl} height="25" width="25" role="presentation" />
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

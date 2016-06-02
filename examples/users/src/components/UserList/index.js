import React, { Component, PropTypes } from 'react';
import UserPreview from '../UserPreview';
import styles from './styles.css';

/* eslint-disable max-len  */

class UserList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        avatarUrl: PropTypes.string,
      }),
    ).isRequired,
  };

  render() {
    return (
      <ul className={styles.root}>
        {this.props.users.map((user) => (
          <li key={user.id}>
            <UserPreview user={user} />
          </li>
        ))}
      </ul>
    );
  }
}

export default UserList;

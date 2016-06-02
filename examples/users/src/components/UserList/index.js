import React, { Component, PropTypes } from 'react';
import UserPreview from '../UserPreview';

/* eslint-disable max-len  */

class UserList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        avatarUrl: PropTypes.avatarUrl,
      }),
    ).isRequired,
  };

  render() {
    return (
      <ul>
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

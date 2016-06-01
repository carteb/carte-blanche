import React, { Component, PropTypes } from 'react';

class UserList extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    users: PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired, // TODO change to number an figure out broken min
        firstName: React.PropTypes.string,
        lastName: React.PropTypes.string,
      }),
    ).isRequired,
  };

  render() {
    return (
      <ul>
        {this.props.users.map((user) => <li key={user.id}>{user.firstName} {user.lastName}</li>)}
      </ul>
    );
  }
}

export default UserList;

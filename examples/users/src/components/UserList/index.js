import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

/* eslint-disable max-len  */

class UserList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        imgurl: PropTypes.imgurl,
      }),
    ).isRequired,
  };

  render() {
    return (
      <ul>
        {this.props.users.map((user) => (
					<li key={user.id}>
						<Link to={`/user/${user.id}`}>{user.firstName} {user.lastName} {user.imgurl}</Link>
					</li>
				))}
      </ul>
    );
  }
}

export default UserList;

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function UserPreview({ user }) {
  return (
    <Link to={`/user/${user.id}`}>
      {
        user.avatarUrl ?
          <img
            src={user.avatarUrl}
            height="50"
            width="50"
            role="presentation"
          /> :
          null
      }
      <h5>{user.firstName} {user.lastName}</h5>
    </Link>
  );
}

UserPreview.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.avatarUrl,
  }).isRequired,
};

export default UserPreview;

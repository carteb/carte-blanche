import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function UserPreview({ user }) {
  return (
    <Link to={`/user/${user.id}`} className={styles.root}>
      {
        user.avatarUrl ?
          <img
            src={user.avatarUrl}
            role="presentation"
            className={styles.image}
            alt={user.firstName && user.firstName.length > 0 ? user.firstName[0] : ''}
          /> :
          null
      }
      <div className={styles.fullName}>
        <span className={styles.firstName}>{user.firstName}</span>
        <span> {user.lastName}</span>
      </div>
    </Link>
  );
}

UserPreview.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default UserPreview;

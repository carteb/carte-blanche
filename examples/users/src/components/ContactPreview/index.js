import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function ContactPreview({ contact }) {
  return (
    <Link to={`/contact/${contact.id}`} className={styles.root}>
      {
        contact.avatarUrl ?
          <img
            src={contact.avatarUrl}
            className={styles.avatar}
            role="presentation"
          /> :
          <div className={styles.avatarFallback}>
            {contact.firstName[0]}
          </div>
      }
      <div className={styles.fullName}>
        <span className={styles.firstName}>{contact.firstName}</span>
        <span> {contact.lastName}</span>
      </div>
    </Link>
  );
}

ContactPreview.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default ContactPreview;

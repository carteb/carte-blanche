import React, { PropTypes } from 'react';
import styles from './styles.css';

function ContactDetail({ contact }) {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        {contact.avatarUrl ?
          <img
            src={contact.avatarUrl}
            className={styles.avatar}
            role="presentation"
          /> :
          <div className={styles.avatarFallback}>
            {contact.firstName[0]}
          </div>
        }
        <div className={styles.name}>
          {contact.firstName} {contact.lastName}
        </div>
      </div>
      <div className={styles.phone}>
        {contact.phone && contact.phone.map((number) => (
          <div className={styles.number}>{number}</div>
        ))}
      </div>
    </div>
  );
}

ContactDetail.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
    phone: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ContactDetail;

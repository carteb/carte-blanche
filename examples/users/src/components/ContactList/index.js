import React, { Component, PropTypes } from 'react';
import ContactPreview from '../ContactPreview';
import styles from './styles.css';

/* eslint-disable max-len  */

class ContactList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    contacts: PropTypes.arrayOf(
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
        {this.props.contacts.map((contact) => (
          <li key={contact.id}>
            <ContactPreview contact={contact} />
          </li>
        ))}
      </ul>
    );
  }
}

export default ContactList;

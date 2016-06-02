import React, { PropTypes } from 'react';

function ContactDetail({ contact }) {
  return (
    <div className="contact-preview">
      {contact.avatarUrl ?
        <img src={contact.avatarUrl} height="50" width="50" role="presentation" /> : null
      }
      <h5>{contact.firstName} {contact.lastName}</h5>
    </div>
  );
}

ContactDetail.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default ContactDetail;

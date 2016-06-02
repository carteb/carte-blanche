import React, { PropTypes } from 'react';
import CallStats from '../CallStats'

function ContactDetail({ contact, calls, onAddCall }) {
  return (
    <div className="contact-preview">
      {contact.avatarUrl ?
        <img src={contact.avatarUrl} height="50" width="50" role="presentation" /> : null
      }
      <h5>{contact.firstName} {contact.lastName}</h5>
      <CallStats calls={calls} onAddCall={onAddCall} receiverId={contact.id} />
    </div>
  );
}

ContactDetail.propTypes = {
  onAddCall: React.PropTypes.func.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  calls: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number,
      duration: PropTypes.number,
      receiverId: PropTypes.string,
    }),
  ).isRequired
};

export default ContactDetail;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ContactDetail from '../components/ContactDetail';
import ContactNotFound from '../components/ContactNotFound';

class ContactDetailContainer extends Component { // eslint-disable-line
  render() {
    // const { contacts, actions } = this.props;
    if (this.props.contact == null) {
      return <ContactNotFound />;
    }

    return (<ContactDetail contact={this.props.contact} />);
  }
}

ContactDetailContainer.propTypes = {
  contact: PropTypes.object,
};

function mapStateToProps(state, props) {
  return {
    contact: state.contacts.find(contact => contact.id === props.params.id),
  };
}

export default connect(
  mapStateToProps
)(ContactDetailContainer);

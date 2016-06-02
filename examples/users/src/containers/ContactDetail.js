import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ContactDetail from '../components/ContactDetail';
import ContactNotFound from '../components/ContactNotFound';

import * as ContactActions from '../actions';

class ContactDetailContainer extends Component { // eslint-disable-line
  render() {
    // const { contacts, actions } = this.props;
    if (this.props.contact == null) {
      return <ContactNotFound />;
    }

    const { contact, calls, actions: { addCall } } = this.props

    return (<ContactDetail contact={contact} calls={calls} onAddCall={addCall} />);
  }
}

ContactDetailContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  contact: PropTypes.object,
  calls: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number,
      duration: PropTypes.number,
      receiverId: PropTypes.string,
    }),
  )
}

function mapStateToProps(state, props) {
  return {
    contact: state.contacts.find(contact => contact.id === props.params.id),
    calls: state.calls.filter(call => call.receiverId === props.params.id)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContactActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetailContainer);

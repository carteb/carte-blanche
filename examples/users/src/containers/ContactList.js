import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddContact from '../components/AddContact';
import ContactList from '../components/ContactList';
import sortBy from 'lodash/sortBy';

import * as ContactActions from '../actions';

class ContactListContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <AddContact onAddContact={this.props.actions.addContact} />
        <ContactList contacts={this.props.contacts} />
      </div>
    );
  }
}

ContactListContainer.propTypes = {
  contacts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    contacts: sortBy(state.contacts, ['firstName', 'lastName']),
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
)(ContactListContainer);

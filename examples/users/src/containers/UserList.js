import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddUser from '../components/AddUser';
import UserList from '../components/UserList';
import sortBy from 'lodash/sortBy';

import * as UserActions from '../actions';

class UserListContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <AddUser onAddUser={this.props.actions.addUser} />
        <UserList users={this.props.users} />
      </div>
    );
  }
}

UserListContainer.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    users: sortBy(state.users, ['firstName', 'lastName']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);

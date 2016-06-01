import React, { Component, PropTypes } from 'react';

import AddUser from '../AddUser';
import UserList from '../UserList';

class App extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    // onAddUser: React.PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <AddUser onAddUser={this.props.actions.addUser} />
        <UserList users={this.props.users} />
      </div>
    );
  }
}

export default App;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserDetail from '../components/UserDetail';
import UserNotFound from '../components/UserNotFound';

class UserDetailContainer extends Component { // eslint-disable-line
  render() {
    // const { users, actions } = this.props;
    if (this.props.user == null) {
      return <UserNotFound />;
    }

    return (<UserDetail user={this.props.user} />);
  }
}

UserDetailContainer.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state, props) {
  return {
    user: state.users.find(user => user.id === props.params.id),
  };
}

export default connect(
  mapStateToProps
)(UserDetailContainer);

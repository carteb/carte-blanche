import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserDetail from '../components/UserDetail';
import UserNotFound from '../components/UserNotFound';

// import Header from '../components/Header';
// import MainSection from '../components/MainSection';
// <Header addTodo={actions.addTodo} />
// <MainSection todos={todos} actions={actions} />

class UserDetailPage extends Component { // eslint-disable-line
  render() {
    // const { users, actions } = this.props;
		if (this.props.user == null) {
			return <UserNotFound/>
		} else {
			return (<UserDetail {...this.props.user} />);
		}
  }
}

UserDetailPage.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state, props) {
  return {
    user: state.users.find(user => user.id == props.params.id)
  };
}

export default connect(
  mapStateToProps
)(UserDetailPage);

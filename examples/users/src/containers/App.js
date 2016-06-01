import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';

// import Header from '../components/Header';
// import MainSection from '../components/MainSection';
// <Header addTodo={actions.addTodo} />
// <MainSection todos={todos} actions={actions} />

import * as UserActions from '../actions';

class AppContainer extends Component { // eslint-disable-line
  render() {
    // const { users, actions } = this.props;
    return (<App {...this.props} />);
  }
}

AppContainer.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.users,
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
)(AppContainer);

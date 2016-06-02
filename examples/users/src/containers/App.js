import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

class AppContainer extends Component { // eslint-disable-line

  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatarUrl: PropTypes.avatarUrl,
    }).isRequired,
  };

  render() {
    return (<App {...this.props} />);
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(
  mapStateToProps,
)(AppContainer);

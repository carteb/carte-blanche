import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class App extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatarUrl: PropTypes.avatarUrl,
    }).isRequired,
  };

  render() {
    const { avatarUrl } = this.props;
    return (
      <div>
        <Link to={'/'}>Logo</Link>
        <img src={avatarUrl} height="25" width="25" role="presentation" />
        {this.props.children}
      </div>
    );
  }
}

export default App;

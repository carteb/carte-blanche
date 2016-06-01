import React, { Component } from 'react';

class AddUser extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onAddUser: React.PropTypes.func.isRequired,
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onAddUser('Max', 'Muster');
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddUser;

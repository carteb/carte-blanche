import React, { Component } from 'react';
import { map } from 'lodash';
import UserPreview from '../UserPreview';

/* eslint-disable max-len */

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  imgurl: '',
};

class AddUser extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onAddUser: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const { firstName, lastName, imgurl } = this.state;
    this.props.onAddUser(firstName, lastName, imgurl);
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const createInput = (name) => (<input id={name} value={this.state[name]} key={name} onChange={e => this.setState({ [name]: e.target.value })} />);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {map(this.state, (val, name) => createInput(name))}
          <button type="submit">Add</button>
        </form>
        <UserPreview {...this.state} />
      </div>
    );
  }
}

export default AddUser;

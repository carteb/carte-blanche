import React, { Component } from 'react';
import { map } from 'lodash';
import ContactPreview from '../ContactPreview';

/* eslint-disable max-len */

const initialState = {
  firstName: '',
  lastName: '',
  avatarUrl: '',
};

class AddContact extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onAddContact: React.PropTypes.func.isRequired,
  };

  state = { ...initialState }

  onSubmit = (evt) => {
    evt.preventDefault();
    const { firstName, lastName, avatarUrl } = this.state;
    this.props.onAddContact(firstName, lastName, avatarUrl);
    this.setState({ ...initialState });
  }

  render() {
    const createInput = (name) => (<input id={name} value={this.state[name]} key={name} onChange={e => this.setState({ [name]: e.target.value })} />);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {map(this.state, (val, name) => createInput(name))}
          <button type="submit">Add</button>
        </form>
        <ContactPreview contact={{ ...this.state }} />
      </div>
    );
  }
}

export default AddContact;

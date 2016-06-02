import React, { Component } from 'react';
import styles from './styles.css';

/* eslint-disable max-len */

const initialState = {
  firstName: '',
  lastName: '',
  avatarUrl: '',
  phone: [],
};

class AddContact extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onAddContact: React.PropTypes.func.isRequired,
  };

  state = { ...initialState }

  onSubmit = (evt) => {
    evt.preventDefault();
    const { firstName, lastName, avatarUrl, phone } = this.state;
    this.props.onAddContact(firstName, lastName, avatarUrl, phone);
    this.setState({ ...initialState });
  }

  render() {
    return (
      <div className={styles.root}>
        <form onSubmit={this.onSubmit} className={styles.form}>
          <input
            value={this.state.firstName}
            className={styles.input}
            onChange={e => this.setState({ firstName: e.target.value })}
            placeholder="First name"
          />
          <input
            value={this.state.lastName}
            className={styles.input}
            onChange={e => this.setState({ lastName: e.target.value })}
            placeholder="Last name"
          />
          <input
            value={this.state.avatarUrl}
            className={styles.input}
            onChange={e => this.setState({ avatarUrl: e.target.value })}
            placeholder="Photo Url"
          />
          <input
            value={this.state.phone[0]}
            className={styles.input}
            onChange={e => this.setState({ phone: [e.target.value] })}
            placeholder="Phone"
          />
          <button
            type="submit"
            className={styles.button}
          >
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}

export default AddContact;

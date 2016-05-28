import React, { Component } from 'react';

import Button from '../Button';

import { StyleSheet, css } from 'aphrodite';

const borderRadius = '3px';
const fontFamily = 'Helvetica, Arial, sans-serif';
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius,
    boxShadow: '0 1px 1px rgba(50,59,67,0.1)',
    padding: '1.5em',
    fontFamily,
    color: '#222',
    maxWidth: '20em',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    borderRadius,
    height: '6em',
    width: '6em',
  },
  information: {
    paddingLeft: '1.5em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: '1.5em',
    fontFamily,
    margin: 0,
    color: '#222',
  },
  username: {
    fontSize: '1em',
    fontFamily,
    fontWeight: 300,
    margin: 0,
    color: '#999',
  },
  paragraph: {
    fontSize: '1em',
    margin: '1.25em 0',
    fontFamily,
    color: '#222',
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Profile extends Component {
  static propTypes = {
    avatarUrl: React.PropTypes.string.isRequired,
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string,
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.string,
  };

  onAddFriend = () => {
    alert(`Add @${this.props.username} as a friend`); // eslint-disable-line no-alert
  };

  render() {
    return (
      <div className={css(styles.card)}>
        <div className={css(styles.row)}>
          <img
            className={css(styles.avatar)}
            src={this.props.avatarUrl}
            alt={`${this.props.firstName} ${this.props.lastName}`}
          />
          <div className={css(styles.information)}>
            <h1 className={css(styles.name)}>
              {this.props.firstName}{(this.props.lastName) ? (` ${this.props.lastName}`) : null}
            </h1>
            <h2 className={css(styles.username)}>@{this.props.username}</h2>
          </div>
        </div>
        <p className={css(styles.paragraph)}>{this.props.bio}</p>
        <div className={css(styles.buttonWrapper)}>
          <Button type="secondary" onClick={this.onAddFriend}>
            Add friend!
          </Button>
        </div>
      </div>
    );
  }
}

export default Profile;

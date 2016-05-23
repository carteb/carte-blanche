import React, { Component } from 'react';

const styles = {};

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
      <div style={styles.card}>
        <div style={styles.row}>
          <img
            style={styles.avatar}
            src={this.props.avatarUrl}
            alt={`${this.props.firstName} ${this.props.lastName}`}
          />
          <div style={styles.information}>
            <h1 style={styles.name}>
              {this.props.firstName}{(this.props.lastName) ? (` ${this.props.lastName}`) : null}
            </h1>
            <h2 style={styles.username}>@{this.props.username}</h2>
          </div>
        </div>
        <p style={styles.paragraph}>{this.props.bio}</p>
        <div style={styles.buttonWrapper}>
        </div>
      </div>
    );
  }
}

export default Profile;

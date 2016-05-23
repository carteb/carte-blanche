import React, { Component } from 'react';
import useSheet from 'react-jss';
import jss from 'jss';
import extend from 'jss-extend';

// Setup jss plugins.
jss.use(extend());
import styles from './styles';

import Button from '../Button';

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
      <div className={this.props.sheet.classes.card}>
        <div className={this.props.sheet.classes.row}>
          <img
            className={this.props.sheet.classes.avatar}
            src={this.props.avatarUrl}
            alt={`${this.props.firstName} ${this.props.lastName}`}
          />
          <div className={this.props.sheet.classes.information}>
            <h1 className={this.props.sheet.classes.name}>
              {this.props.firstName}{(this.props.lastName) ? (` ${this.props.lastName}`) : null}
            </h1>
            <h2 className={this.props.sheet.classes.username}>@{this.props.username}</h2>
          </div>
        </div>
        <p className={this.props.sheet.classes.paragraph}>{this.props.bio}</p>
        <div className={this.props.sheet.classes.buttonWrapper}>
          <Button type="secondary" onClick={this.onAddFriend}>
            Add friend!
          </Button>
        </div>
      </div>
    );
  }
}

export default useSheet(Profile, styles);

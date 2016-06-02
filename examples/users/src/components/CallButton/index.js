import React, { Component } from 'react';
import { map } from 'lodash';
import ContactPreview from '../ContactPreview';

/* eslint-disable max-len */

const initialState = {
  timestamp: undefined,
  duration: undefined,
  editing: false,
};

class CallButton extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onAddCall: React.PropTypes.func.isRequired,
    receiverId: React.PropTypes.string.isRequired
  };

  state = { ...initialState }

  onEndCall = e => {
    const { timestamp, duration } = this.state
    const { receiverId } = this.props
    this.props.onAddCall(timestamp, duration, receiverId);
    this.setState({ ...initialState });
    clearInterval(this.interval)
  }

  onStartCall = () => {
    this.setState({timestamp: Date.now(), duration: 0})
    clearInterval(this.interval)
    this.interval = setInterval(() => this.setState(state => { return {duration: state.duration + 1}}), 1000)
  }

  onNewDuration = e => {
    this.setState({duration: e.target.value|0})
    clearInterval(this.interval)
  }

  render() {
    const { editing, timestamp, duration } = this.state

    let buttonValue = null
    if (editing) {
      buttonValue = <input type="number" value={duration} onChange={this.onNewDuration} />
    } else if (timestamp) {
      buttonValue = <span onClick={() => this.setState({editing: true})}>{duration}</span>
    } else {
      buttonValue = <span onClick={this.onStartCall}>Call</span>
    }

    return (
      <div>
        <button>{buttonValue}</button>
        {timestamp ? <button onClick={this.onEndCall}>End Call</button> : null}
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
}

export default CallButton;

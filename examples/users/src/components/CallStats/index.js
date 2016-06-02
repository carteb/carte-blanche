import React, { Component, PropTypes } from 'react';
import { VictoryScatter } from 'victory';
import CallButton from '../CallButton';

/* eslint-disable max-len  */

class ContactList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onAddCall: React.PropTypes.func.isRequired,
    receiverId: React.PropTypes.string.isRequired,
    calls: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number,
        duration: PropTypes.number,
        receiverId: PropTypes.string,
      }),
    ).isRequired
  };

  render() {
    const { receiverId, calls, onAddCall } = this.props

    const data = calls.map(call => {
      return {x: new Date(call.timestamp).getHours(), y: call.timestamp}
    })

    const xRange = calls.reduce((range, call) => {
      const min = call.timestamp < range[0] ? call.timestamp : range[0]
      const max = call.timestamp > range[1] ? call.timestamp : range[1]
      return [min, max]
    }, [Date.now(), Date.now()])

    // domain={{x: xRange, y: [0, 24]}}

    return (
      <div>
        <CallButton onAddCall={onAddCall} receiverId={receiverId} />
        <span>Calls: {calls.length}</span>
        <ul>
          {calls.map(call => (
            <li key={call.id}>{call.timestamp} {call.duration}</li>
          ))}
        </ul>

        <VictoryScatter data={data} />
      </div>
    );
  }
}

export default ContactList;

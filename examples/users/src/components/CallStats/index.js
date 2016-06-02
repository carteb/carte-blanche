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

    const data = calls.map((call, key) => {
      return {y: new Date(call.timestamp).getHours(), x: call.timestamp}
    })

    const xRange = calls.reduce((range, call) => {
      const min = call.timestamp < range[0] ? call.timestamp : range[0]
      const max = call.timestamp > range[1] ? call.timestamp : range[1]
      return [min, max]
    }, [Date.now(), 0])

    return (
      <div>
        <CallButton onAddCall={onAddCall} receiverId={receiverId} />
        <span>Calls: {calls.length}</span>
        <ul>
          {calls.map(call => {
            const time = new Date(call.timestamp)
            return (
              <li key={call.id}>
                <span>{`${time.getDate()}/${time.getMonth()}/${time.getFullYear()} `}</span>
                <span>{`${(call.duration/3600)|0}h ${((call.duration%3600)/60)|0}m`}</span>
              </li>)
          })}
        </ul>

        <VictoryScatter data={data} domain={{x: xRange, y: [0, 24]}} />

      </div>
    );
  }
}

export default ContactList;

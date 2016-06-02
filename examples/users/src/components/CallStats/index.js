import React, { Component, PropTypes } from 'react';
import { VictoryScatter, VictoryChart, VictoryAxis } from 'victory';
import CallButton from '../CallButton';
import styles from './styles.css';

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
      }).isRequired,
    ).isRequired,
  };

  render() {
    const { receiverId, calls, onAddCall } = this.props;

    const data = calls.map((call) => (
      { y: new Date(call.timestamp).getHours(), x: call.timestamp }
    ));

    const xRange = calls.reduce((range, call) => {
      const min = call.timestamp < range[0] ? call.timestamp : range[0];
      const max = call.timestamp > range[1] ? call.timestamp : range[1];
      return [min, max];
    }, [Date.now(), 0]);

    return (
      <div className={styles.root}>
        <CallButton onAddCall={onAddCall} receiverId={receiverId} />
        <ul className={styles.callList}>
          {calls.map(call => {
            const time = new Date(call.timestamp);
            return (
              <li className={styles.call} key={call.id}>
                <span>{`${time.getDate()}/${time.getMonth()}/${time.getFullYear()} `}</span>
                <span>
                  {`${(call.duration / 3600) | 0}h ${((call.duration % 3600) / 60) | 0}m`}
                </span>
              </li>);
          })}
        </ul>
        <span className={styles.call}>Total calls: {calls.length}</span>

        <VictoryChart>
          <VictoryAxis
            label="Day"
            tickFormat={(x) => {
              const date = new Date(x);
              return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().substr(-2)}`;
            }}
            style={{
              grid: { stroke: 'transparent' },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { fontSize: 11, color: '#666' },
              axisLabel: { fontSize: 10, color: '#999', padding: 20 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Hour"
            style={{
              grid: { stroke: 'transparent' },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { fontSize: 11, color: '#666' },
              axisLabel: { fontSize: 10, color: '#999' },
            }}
          />
          <VictoryScatter
            data={data}
            domain={{ x: xRange, y: [0, 24] }}
          />
        </VictoryChart>

      </div>
    );
  }
}

export default ContactList;

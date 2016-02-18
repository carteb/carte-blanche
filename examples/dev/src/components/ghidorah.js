/* @flow */

import React, { Component } from 'react';

type Props = {
  isDangerous: boolean,
  name: string,
}

type DefaultProps = {
  isDangerous: boolean,
}

export default class Ghidorah extends Component<DefaultProps, Props, void> {

  static defaultProps: DefaultProps = {
    isDangerous: false,
  };

  props: Props;

  render() {
    return (
      <div>
        <div>{ this.props.name }</div>
        <div>{ this.props.isDangerous ? 'Dangerous' : 'Not Dangerous'}</div>
      </div>
    );
  }
}

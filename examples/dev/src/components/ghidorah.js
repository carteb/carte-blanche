/* @flow */

import React, { Component } from 'react';

type Hairs = {
  length: number,
}

type Fur = {
  color: string,
  density: number,
  hairs: Hairs,
}

type Props = {
  isDangerous: boolean,
  age?: number,
  description?: string,
  fur?: Fur,
  teeth?: Array<number>,
  teethOfTeeth?: Array<Array<number>>,
  toe?: number | string,
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
        <div>{ this.props.isDangerous ? 'Dangerous' : 'Not Dangerous'}</div>
        <div>description: { this.props.description }</div>
        <div>Age: { this.props.age }</div>
        {(this.props.fur) ? (
          <div>Fur: Density: { this.props.fur.density }</div>
        ) : null}
        <div>array: { this.props.teeth }</div>
        <div>array of arrays: { this.props.teethOfTeeth }</div>
        <div>toe: { this.props.toe }</div>
      </div>
    );
  }
}

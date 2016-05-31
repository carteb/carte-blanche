import React from 'react';

class IFrameDataManager extends React.Component { // eslint-disable-line

  constructor(props) {
    super(props);
    window.UPDATE_COMPONENT = (componentProps) => {
      this.setState({
        componentProps,
      });
    };
  }

  state = {
    componentProps: window.INITIAL_COMPONENT_DATA,
  }

  render() {
    const Component = this.props.component;
    // TODO figure out why the passed props are not raw objects
    const propAsRawObject = { ...this.state.componentProps };
    return <Component { ...propAsRawObject } />;
  }
}

export default IFrameDataManager;

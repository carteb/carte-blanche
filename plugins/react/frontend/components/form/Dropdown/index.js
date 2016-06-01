import React from 'react';

import styles from './styles.css';

class Dropdown extends React.Component {

  componentDidMount() {
    this.ignoreNextClose = false;
    document.addEventListener('click', this.onClose, false);
  }

  componentWillReceiveProps(nextProps) {
    this.ignoreNextClose = nextProps.active && !this.props.active;
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClose, false);
  }

  onClose = (evt) => {
    if (this.props.onClose &&
        this.props.active &&
        !this.ignoreNextClose &&
        !this.wrapper.contains(evt.target)
    ) {
      this.props.onClose();
    }
    this.ignoreNextClose = false;
  }

  render() {
    const { active = false, ...otherProps } = this.props;
    return (
      <div
        {...otherProps}
        className={active ? styles.root : styles.hidden}
        ref={(ref) => { this.wrapper = ref; }}
      />
    );
  }
}

export default Dropdown;

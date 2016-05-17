import React, { PropTypes, Component } from 'react';
import { VelocityComponent } from 'velocity-react';

import Card from '../Card';
import styles from './styles.css';

class CreateVariationButton extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  state = {
    inputVisible: false,
    inputValue: '',
    error: '',
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.error !== this.state.error
        && nextProps.error !== this.props.error) {
      this.setState({
        error: nextProps.error,
      });
    }
    return true;
  }

  buttonClick = (newState) => {
    if (newState === true || newState === false || !this.state.inputVisible) {
      this.setState({
        inputVisible: newState || !this.state.inputVisible,
      });
    } else {
      this.submitForm();
    }
  };

  changeInput = (evt) => {
    this.setState({
      error: '',
      inputValue: evt.target.value,
    });
  };

  submitForm = (evt) => {
    evt && evt.preventDefault(); // eslint-disable-line no-unused-expressions
    if (this.state.inputValue && this.state.inputValue !== '') {
      this.props.onSubmit(this.state.inputValue);
    } else {
      this.setState({
        error: 'Empty input',
      });
    }
  };

  render() {
    return (
      <VelocityComponent
        animation={{
          translateX: (this.state.error !== '') ? '1em' : 0,
        }}
        loop={2}
        duration={50}
        easing="ease-in-out"
        reverse
      >
        <Card
          className={styles.wrapper}
          onClick={this.buttonClick}
          aria-role="button"
        >
          <VelocityComponent
            animation={{
              opacity: this.state.inputVisible ? 1 : 0,
            }}
            duration={150}
            display={this.state.inputVisible ? 'block' : 'none'}
          >
            <form onSubmit={this.submitForm}>
              <input
                className={styles.input}
                type="text"
                value={this.state.inputValue}
                onChange={this.changeInput}
              />
            </form>
          </VelocityComponent>
          <svg
            className={styles.svg}
            version="1.1"
            viewBox="0 0 24 24"
            x="0px"
            y="0px"
            xmlSpace="preserve"
          >
            <g>
              <line
                fill="none"
                strokeLinecap="round"
                x1="11.5"
                x2="11.5"
                y1="0.5"
                y2="22.5"
              />
              <line
                fill="none"
                strokeLinecap="round"
                x1="22.5"
                x2="0.5"
                y1="11.5"
                y2="11.5"
              />
            </g>
          </svg>
        </Card>
      </VelocityComponent>
    );
  }
}

export default CreateVariationButton;

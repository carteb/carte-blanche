import React, { PropTypes, Component } from 'react';

import Card from '../Card';
import styles from './styles.css';
import getSlug from 'speakingurl';
import Input from '../../form/Input';
import Button from '../../form/Button';
import has from 'lodash/has';

class CreateVariationButton extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    variationPropsList: PropTypes.object.isRequired,
  };

  state = {
    inputVisible: false,
    inputValue: '',
    error: '',
  };

  componentDidUpdate() {
    if (this.state.inputVisible) {
      this.input.focus();
    }
  }

  onBlur = () => {
    this.setState({
      inputVisible: false,
    });
  }

  buttonClick = () => {
    this.setState({
      inputVisible: true,
    });
  };

  changeInput = (data) => {
    this.setState({
      error: '',
      inputValue: data.value,
    });
  };

  submitForm = (evt) => {
    evt && evt.preventDefault(); // eslint-disable-line no-unused-expressions

    if (this.state.inputValue === '') {
      this.setState({
        error: 'Please provide a name for the variation',
      });
      return;
    }

    const slug = getSlug(this.state.inputValue);
    if (has(this.props.variationPropsList, `${slug}`)) {
      this.setState({
        error: `A variation with the name ${name} already exists.`,
      });
      return;
    }

    this.setState({
      inputValue: '',
      error: '',
    });
    this.props.onSubmit(this.state.inputValue, slug);
  };

  render() {
    return (
      <Card
        onClick={this.buttonClick}
        aria-role="button"
        className={styles.card}
      >
        <form
          onSubmit={this.submitForm}
          className={!this.state.inputVisible && styles.hidden}
        >
          <div className={styles.wrapper}>
            <Input
              className={styles.input}
              value={this.state.inputValue}
              onChange={this.changeInput}
              placeholder="Variation name"
              onBlur={this.onBlur}
              ref={(ref) => { this.input = ref; }}
            />
            <Button
              type="submit"
              className={styles.button}
            >
              Create Variation
            </Button>
          </div>
          <div className={this.state.error ? styles.error : styles.hidden}>
            {this.state.error}
          </div>
        </form>
        <div className={this.state.inputVisible ? styles.hidden : styles.svgWrapper}>
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
        </div>
      </Card>
    );
  }
}

export default CreateVariationButton;

import React, { PropTypes } from 'react';

import Label from '../Label';
import styles from './styles.css';
import inputStyles from '../Input/styles.css';

function Select(props) {
  return (
    <div
      className={
        (props.isNested) ?
        inputStyles['wrapper--nested'] :
        inputStyles.wrapper
      }
    >
      {(props.secondaryLabel) && (
        <Label
          text={props.secondaryLabel}
          isNested={props.isNested}
          onRandomClick={props.onRandomClick}
          secondary
        />
      )}
      <Label
        text={props.label}
        isNested={props.isNested}
        onRandomClick={props.onRandomClick}
      />
      {/* TODO HANDLE UNDEFINED AND NULL */}
      <select
        value={props.value}
        onChange={props.onChange}
        className={styles.select}
        size={props.options.length}
      >
        {props.options.map((option, index) => {
          // Need to replace here because otherwise the value would be "'string'",
          // when it should be "string"
          const value =
            (typeof option.value === 'string')
            ? option.value.replace(/^'|'$/gi, '') : option.value;
          return (
            <option value={value} key={index} className={styles.option}>
              {option.label || option.value}
            </option>
          );
        }
      )}
      </select>
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func,
  value: PropTypes.any.isRequired,
  options: PropTypes.any.isRequired,
};

export default Select;

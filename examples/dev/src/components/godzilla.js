import React, { PropTypes } from 'react';

const Godzilla = ({ isDangerous = false, age, description, fur, teeth }) => {
  return (
    <div>
      <div>{ isDangerous ? 'Dangerous' : 'Not Dangerous'}</div>
      <div>description: { description }</div>
      <div>Age: { age }</div>
      {(fur) ? (
        <div>Fur: Density: { fur.density }</div>
      ) : null}
      <div>array: { teeth }</div>
    </div>
  );
};

Godzilla.propTypes = {
  isDangerous: PropTypes.bool,
  // age: PropTypes.number,
  // description: PropTypes.string,
  // fur: React.PropTypes.shape({
  //   color: React.PropTypes.string,
  //   density: React.PropTypes.number,
  //   hairs: React.PropTypes.shape({
  //     length: React.PropTypes.number,
  //   }),
  // }),
  teeth: React.PropTypes.arrayOf(React.PropTypes.number),
  // nesting: React.PropTypes.shape({
  //   deeper: React.PropTypes.shape({
  //     fontSize: React.PropTypes.number,
  //   }),
  // }),
  // nestedArray: React.PropTypes.arrayOf(
  //   React.PropTypes.shape({
  //     color: React.PropTypes.string,
  //     fontSize: React.PropTypes.number,
  //   }),
  // ),
};

export default Godzilla;

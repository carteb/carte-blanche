import React from 'react';
import { List } from 'immutable';

/**
 * ImmutableList component
 *
 * @exampleFixtures
 * import { List } from 'immutable';
 * const list = List([1,2,3]);
 * const emptyList = List();
 * @example
 * <Component data={ emptyList } />
 * @example
 * <Component data={ list } />
 */
export default (props) => {
  const data = props.data || List();
  return (
    <ul>
      { data.map((item) => (<li>{item}</li>))}
      { data.size === 0 ? 'This list is empty' : '' }
    </ul>
  );
};

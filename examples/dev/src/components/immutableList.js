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
 * <ImmutableList data={ emptyList } />
 * @example
 * <ImmutableList data={ list } />
 */
export default ({ data = List() }) => ((
  <ul>
    { data.map((item) => (<li>{item}</li>))}
    { data.size === 0 ? 'This list is empty' : '' }
  </ul>
));

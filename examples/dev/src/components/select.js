import React from 'react';

/**
 * Select component
 *
 * @exampleFixtures
 * import { Option } from 'ui-lib';
 * @example
 * <Select>
 *   <Option value='apple'>Apple</Option>
 *   <Option value='banana'>Banana</Option>
 * </Select>
 */
export default ({ children = [] }) => ((
  <ul>
    { children.map((option) => (<li>{option}</li>))}
  </ul>
));

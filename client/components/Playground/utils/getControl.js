import React from 'react';
import mapValues from 'lodash/mapValues';
import BooleanControl from '../BooleanControl';
import IntegerControl from '../IntegerControl';
import ArrayControl from '../ArrayControl';
import StringControl from '../StringControl';

const getControl = (prop) => {
  // In nested prop types, the name is at prop.name
  // normally it's at prop.type.name
  const name = prop.name || prop.type.name;
  const value = prop.value || prop.type && prop.type.value;
  let control;
  switch (name) {
    case 'bool':
      control = <BooleanControl />;
      break;
    case 'number':
      control = <IntegerControl />;
      break;
    case 'string':
      control = <StringControl />;
      break;
    case 'shape':
      mapValues(value, (innerProp) => {
        innerProp.control = getControl(innerProp);
      });
      break;
    case 'arrayOf':
      control = <ArrayControl innerProps={ prop } />;
      break;
    default:
      break;
  }
  return control;
}

export default getControl;

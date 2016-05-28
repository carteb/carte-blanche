import getControl from '../../../../utils/getControl';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';

const normalizeProps = (props) => {
  const propsObject = keyBy(props, 'key');
  const normalizedProps = mapValues(propsObject, (prop) => prop.value);
  return mapValues(normalizedProps, (prop) => {
    prop.control = getControl(prop); // eslint-disable-line no-param-reassign
    return prop;
  });
};

export default normalizeProps;

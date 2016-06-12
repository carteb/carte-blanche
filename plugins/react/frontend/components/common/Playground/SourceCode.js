import React, { PropTypes } from 'react';
import { getComponentNameFromPath } from 'carte-blanche-utils';
import generateComponentSource from '../../../utils/generateComponentSource';

const SourceCode = ({ componentPath, variationProps }) => (
  <code>
    {generateComponentSource(getComponentNameFromPath(componentPath), variationProps)}
  </code>
);

SourceCode.propTypes = {
  componentPath: PropTypes.string.isRequired,
  variationProps: PropTypes.object.isRequired,
};

export default SourceCode;

/**
 * DummyControl
 *
 * Renders an information field mentioning that this property can't be generated.
 */

import React from 'react';

const DummyControl = ({ label }) => (
  <div>
    {label} - there is no control available for this prop type
  </div>
);

DummyControl.randomValue = () => undefined;

export default DummyControl;

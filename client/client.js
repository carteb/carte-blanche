import React from 'react';
import ReactDOM from 'react-dom';

console.log(window.components);

// Render the components in the window.components object
const renderedComponents =
  Object.keys(window.components)
    .map((componentName) => {
      const Instance = window.components[componentName];
      return (<Instance key={componentName} />);
    });

ReactDOM.render(
  <div>
    { renderedComponents }
  </div>,
  document.getElementById('styleguide-root')
);

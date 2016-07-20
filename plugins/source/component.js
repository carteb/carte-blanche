import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

export default function sourceFrontend(frontendData, pluginData) {
  const { value, language } = hljs.highlightAuto(pluginData.source);
  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <pre
        className={`hljs ${language}`}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}

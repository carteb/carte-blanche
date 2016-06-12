/* eslint-disable max-len */
// based on https://github.com/ryanseddon/react-frame-component

import React from 'react';
import path from 'path';

const createHtml = (componentPath, dest, userFiles, injectTags, commonsChunkFilename) => (
  `<!DOCTYPE html>
  <html style="height: 100%; width: 100%; margin: 0; padding: 0;">
    <head>
      ${(injectTags) ? injectTags.join('\n') : ''}
      <style>
        ${userFiles && userFiles.styles.join('\n')}
      </style>
    </head>
    <body style="height: 100%; width: 100%; margin: 0; padding: 0;">
      <div
        id="root"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
        "
      ></div>
      <script>
        window.PLUGIN_NAME = 'react';
        window.COMPONENT_PATH = '${componentPath}';
        window.COMPONENT_DATA = undefined;
      </script>
      ${(commonsChunkFilename !== 'undefined') ? `<script src="/${commonsChunkFilename}"></script>` : ''}
      <script>
        ${userFiles && userFiles.scripts.join('\n')}
      </script>
      <script src="${(dest) ? `/${path.join(dest, 'iframe-client-bundle.js')}` : 'iframe-client-bundle.js'}"></script>
      <script src="${(dest) ? `/${path.join(dest, 'user-bundle.js')}` : 'user-bundle.js'}"></script>
    </body>
  </html>
  `
);

class IFrame extends React.Component {

  componentDidMount() {
    const doc = this.iframe.contentDocument;
    doc.open();
    // eslint-disable-next-line max-len
    doc.write(createHtml(this.props.componentPath, this.props.dest, this.props.userFiles, this.props.injectTags, this.props.commonsChunkFilename));
    doc.close();

    this.iframe.contentWindow.INITIAL_COMPONENT_DATA = this.props.variationProps;
  }

  componentWillReceiveProps(props) {
    if (this.iframe.contentWindow.UPDATE_COMPONENT) {
      this.iframe.contentWindow.UPDATE_COMPONENT(props.variationProps);
    }
  }

  render() {
    return (
      <iframe
        ref={(ref) => { this.iframe = ref; }}
        scrolling="no"
        frameBorder="0"
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

export default IFrame;

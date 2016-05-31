// based on https://github.com/ryanseddon/react-frame-component

import React from 'react';

const createHtml = (componentPath) => (
  `<!DOCTYPE html>
  <html style="height: 100%; width: 100%; margin: 0; padding: 0;">
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
      <script src="client-bundle.js"></script>
      <script src="user-bundle.js"></script>
    </body>
  </html>
  `
);

class IFrame extends React.Component {

  componentDidMount() {
    const doc = this.iframe.contentDocument;
    doc.open();
    doc.write(createHtml(this.props.componentPath));
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

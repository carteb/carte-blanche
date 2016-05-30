const comboBoxStyle = {

  caretToOpenStyle: {
    height: 0,
    width: 0,
    // Avoid this warning: was passed a numeric string value for CSS property `content` (value: ` `)
    content: '-',
    position: 'absolute',
    top: 11,
    right: 8,
    cursor: 'pointer',
    borderTop: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
  },

  caretToCloseStyle: {
    height: 0,
    width: 0,
    // Avoid this warning: was passed a numeric string value for CSS property `content` (value: ` `)
    content: '-',
    position: 'absolute',
    top: 11,
    right: 8,
    cursor: 'pointer',
    borderBottom: '6px solid #666',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
  },

  caretFocusStyle: {
    outline: 0,
  },
};

export default comboBoxStyle;

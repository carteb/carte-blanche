const borderRadius = '3px';
const fontFamily = 'Helvetica, Arial, sans-serif';

const styles = {
  card: {
    'background-color': 'white',
    'border-radius': borderRadius,
    'box-shadow': '0 1px 1px rgba(50,59,67,0.1)',
    padding: '1.5em',
    'font-family': fontFamily,
    color: '#222',
    'max-width': '20em',
  },
  row: {
    width: '100%',
    display: 'flex',
    'flex-direction': 'row',
  },
  avatar: {
    'border-radius': borderRadius,
    height: '6em',
    width: '6em',
  },
  information: {
    'padding-left': '1.5em',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
  },
  name: {
    'font-size': '1.5em',
    'font-family': fontFamily,
    margin: 0,
    color: '#222',
  },
  username: {
    'font-size': '1em',
    'font-family': fontFamily,
    'font-weight': 300,
    margin: 0,
    color: '#999',
  },
  paragraph: {
    'font-size': '1em',
    margin: '1.25em 0',
    'font-family': fontFamily,
    color: '#222',
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    'align-items': 'center',
    'justify-content': 'center',
  },
};

export default styles;

var borderRadius = '3px';
var fontFamily = 'Helvetica, Arial, sans-serif';

var styles = {
  card: {
    backgroundColor: 'white',
    borderRadius,
    boxShadow: '0 1px 1px rgba(50,59,67,0.1)',
    padding: '1.5em',
    fontFamily,
    color: '#222',
    maxWidth: '20em',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    borderRadius,
    height: '6em',
    width: '6em',
  },
  information: {
    paddingLeft: '1.5em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: '1.5em',
    fontFamily,
    margin: 0,
    color: '#222',
  },
  username: {
    fontSize: '1em',
    fontFamily,
    fontWeight: 300,
    margin: 0,
    color: '#999',
  },
  paragraph: {
    fontSize: '1em',
    margin: '1.25em 0',
    fontFamily,
    color: '#222',
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

module.exports = styles;

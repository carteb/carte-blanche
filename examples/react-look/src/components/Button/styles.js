import { StyleSheet } from 'react-look';

const baseStyles = {
  padding: '0.5em 1.75em',
  fontSize: '0.75em',
  borderRadius: '3px',
};

const styles = StyleSheet.create({
  button: {
    ...baseStyles,
    border: '1px solid #6CC0E5',
    color: '#6CC0E5',
    backgroundColor: 'white',
  },
  buttonPrimary: {
    ...baseStyles,
    backgroundColor: '#6CC0E5',
    color: 'white',
    border: '1px solid #6CC0E5',
  },
});

export default styles;

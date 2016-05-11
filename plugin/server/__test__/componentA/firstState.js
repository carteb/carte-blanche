module.exports = {
  props: {
    className: {
      value: 'component-a',
    },
    age: {
      value: 22,
      min: 0,
      max: 140,
    },
  },
  state: {
    focusedAge: {
      value: 19,
      min: 0,
      max: 140,
    },
  },
};

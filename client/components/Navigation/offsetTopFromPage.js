const offsetTopFromPage = (element) => {
  let offsetTop = 0;
  do { // eslint-disable-line no-cond-assign
    if (!isNaN(element.offsetTop)) {
      offsetTop += element.offsetTop;
    }
  } while (element = element.offsetParent); // eslint-disable-line no-param-reassign
  return offsetTop;
};

export default offsetTopFromPage;

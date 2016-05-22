// based on https://github.com/alicelieutier/smoothScroll

const getTop = (element) => {
  // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
  if (element.nodeName === 'HTML') return -window.pageYOffset;
  return element.getBoundingClientRect().top + window.pageYOffset;
};

// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
const easeInOutCubic = (t) => (
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
);

// calculate the scroll position we should be in
// given the start and end point of the scroll
// the time elapsed from the beginning of the scroll
// and the total duration of the scroll (default 500ms)
const position = (start, end, elapsed, duration) => {
  if (elapsed > duration) return end;
  return start + (end - start) * easeInOutCubic(elapsed / duration);
};

// we use requestAnimationFrame to be called by the browser before every repaint
// if the first argument is an element then scroll to the top of this element
// if the first argument is numeric then scroll to this location
// if the callback exist, it is called when the scrolling is finished
// if context is set then scroll that element, else scroll window
const smoothScroll = (el, durationParam, callback) => {
  const duration = durationParam || 500;
  const start = window.pageYOffset;
  let end;

  if (typeof el === 'number') {
    end = parseInt(el, 10);
  } else {
    end = getTop(el);
  }

  const clock = Date.now();
  const requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      ((fn) => { window.setTimeout(fn, 15); });

  const step = () => {
    const elapsed = Date.now() - clock;
    window.scroll(0, position(start, end, elapsed, duration));

    if (elapsed > duration) {
      if (typeof callback === 'function') {
        callback(el);
      }
    } else {
      requestAnimationFrame(step);
    }
  };
  step();
};

export default smoothScroll;

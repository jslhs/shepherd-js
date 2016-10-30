/*eslint-env browser*/

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
          || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());

export function printInfo(...args) {
  let s = '';
  for (let i = 0; i < args.length; i++) {
    s = `${s} ${JSON.stringify(args[i])}`;
  }
  console.log(s);
}

export function printWarn(...args) {
  let s = '';
  for (let i = 0; i < args.length; i++) {
    s = `${s} ${JSON.stringify(args[i])}`;
  }
  console.warn(s);
}

export function updateAndStartCanvas(width, height, name, getScene) {
  const canvasId = `canvas-${name}`;
  const containerId = `container-${name}`;

  const canvasStr = `<canvas width="${width}" height="${height}"
  class="drawing" id="${canvasId}"></canvas>`;

  const container = document.getElementById(containerId);

  container.innerHTML = canvasStr;
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const scene = getScene(ctx, width, height);

  function handler() {
    const inView = isInViewport(container);
    const animId = window.drawings[canvasId];
    if (inView) {
      if (!animId) {
        printInfo('starting: ', canvasId);
        animloop(scene, canvasId);
      }
    } else if (animId) {
      printInfo('stopping: ', canvasId);
      cancelAnimationFrame(animId);
      window.drawings[canvasId] = undefined;
    }
  }

  window.addEventListener('scroll', handler, false);

  //function clickHandler() {
  //  canvas.removeEventListener('scroll', handler, false);
  //  //updateAndStartCanvas(width, height, name, getScene(ctx, width, height));
  //}
  //canvas.addEventListener('click', clickHandler, false);
}

export function animloop(f, canvasId) {
  window.drawings[canvasId] = requestAnimationFrame(() => animloop(f, canvasId));
  f();
}

export function getCanvasSize() {
  const width = Math.max(window.innerWidth, 320);
  const height = Math.max(window.innerHeight*0.6, 400);
  return {
    width, height
  };
}

//https://gist.github.com/jjmu15/8646226
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;
  const bottom = rect.bottom;
  const top = rect.top;
  const mid = (bottom+top)*0.5;
  return mid > 0 && mid<(window.innerHeight || html.clientHeight);
}

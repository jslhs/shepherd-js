/*eslint-env browser*/

const NARATIVE = 'narative';
const NARATIVENAV = 'narative-nav';

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

export function updateCanvas(width, height) {
  const canvasStr = `<canvas width="${width}" height="${height}" id="drawing"></canvas>`;
  document.getElementById('box').innerHTML = canvasStr;
  const canvas = document.getElementById('drawing');
  const ctx = canvas.getContext('2d');
  return ctx;
}

function animloop(f) {
  window.sceneAnim = requestAnimationFrame(() => animloop(f));
  f();
}

function buildNarativeNav(nav) {
  let prev = '';
  let next = '';
  if (nav.prev) {
    prev = `<span><a href="#${nav.prev}">Previous</span>`;
  }
  if (nav.next) {
    next = `<span><a href="#${nav.next}">Next</span>`;
  }
  return `${prev} ${next}`;
}

export function play(scene, f) {
  const narativeDiv = document.getElementById(NARATIVE);
  narativeDiv.innerHTML = scene.narative;
  const narativeNavDiv = document.getElementById(NARATIVENAV);
  narativeNavDiv.innerHTML = buildNarativeNav(scene.nav);

  if (window.sceneAnim) {
    // i regret nothing!
    cancelAnimationFrame(window.sceneAnim);
    window.sceneAnim = undefined;
  }
  animloop(f);
}


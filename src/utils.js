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
    prev = `<a class="paginator prev" href="#${nav.prev}">Previous</a>`;
  }
  if (nav.next) {
    next = `<a class="paginator next" href="#${nav.next}">Next</a>`;
  }
  return `${prev} ${next}`;
}

function buildNarative(scene) {
  return `<h2>${scene.title}</h2> ${scene.narative}`;
}

function play(scene, f) {
  const narativeDiv = document.getElementById(NARATIVE);
  const narativeNavDiv = document.getElementById(NARATIVENAV);

  narativeDiv.innerHTML = buildNarative(scene);
  narativeNavDiv.innerHTML = buildNarativeNav(scene.nav);

  if (window.sceneAnim) {
    // i regret nothing!
    cancelAnimationFrame(window.sceneAnim);
    window.sceneAnim = undefined;
  }
  animloop(f);
}

export function doNav(story, ctx, width, height) {
  const hash = window.location.hash.slice(1);
  if (!hash) {
    window.location.hash = '#single';
  } else if (story[hash]) {
    const s = story[hash];
    const f = s.scene(ctx, width, height);
    play(s, f);
  } else {
    printWarn('No scene?');
    window.location.hash = '#single';
  }
}

export function getCanvasSize() {
  const width = Math.max(window.innerWidth, 320);
  const height = Math.max(window.innerHeight*0.6, 500);
  return {
    width, height
  };
}


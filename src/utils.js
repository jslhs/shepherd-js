/*eslint-env browser*/

export function print(...args) {
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

export function animloop(f) {
  f();
  setTimeout(() => {
    animloop(f);
  }, 1000/60);
}

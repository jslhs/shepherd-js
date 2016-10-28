/*eslint-env browser*/

const WHITE = '#fff';
const BLACK = '#000';

function print() {
  let s = '';
  for (let i = 0; i < arguments.length; i++) {
  s = `${s} ${JSON.stringify(arguments[i])}`;
  }
  console.log(s);
}

function randInt(a, b) {
  return a + Math.floor(Math.random() * (b - a));
}

function getRndTup(n, a, b) {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push({
      x: Math.random() * a,
      y: Math.random() * b
    });
  }
  return res;
}

function drawPath(ctx, p) {
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);

  p.splice(1).forEach(({ x, y }) => {
    ctx.lineTo(x, y);
    return;
  });
  ctx.stroke();
}

function drawState(ctx, state) {
  state.map(s => drawPath(s));
}

function scene1(ctx, width, height) {
  print('test canvas');
  const n = 10;
  const rnd = getRndTup(n);
}

function updateCanvas(width, height) {
  const canvasStr = `<canvas width="${width}" height="${height}" id="drawing"></canvas>`;
  document.getElementById('box').innerHTML = canvasStr;
  const canvas = document.getElementById('drawing');
  const ctx = canvas.getContext('2d');
  return ctx;
}


function main() {
  //const tempDiv = document.getElementById('temp');
  //tempDiv.innerHTML = Math.floor(temperatureDisplay) + '°C';

  //window.onresize = function() {
  //  const width = window.innerWidth;
  //  const height = window.innerHeight;
  //  print('resize', width, height);
  //  updateCanvas(testCanvas, width, height);
  //};

  const width = window.innerWidth;
  const height = window.innerHeight;

  const ctx = updateCanvas(width, height);
  ctx.strokeStyle = BLACK;

  const scenes = {
    1: {
      state: [getRndTup(10, width, height)],
      updateState: () => [getRndTup(10, width, height)],
      anim: scene1
    }
  };

  updateCanvas(scenes, width, height);

  //function animloop(){
  //}

  //setTimeout(() => {
  //  animloop();
  //}, 300);

  //animloop();
}

main();


/*eslint-env browser*/


import { getLinspaceYLinspaceX, getRndYLinspaceX } from './random';
import { print, printWarn, updateCanvas, animloop } from './utils';


const WHITE = 'rgba(255, 255, 255, 1.0)';
const BLACK = 'rgba(0, 0, 0, 1.0)';
const GRAY = 'rgba(0, 0, 0, 0.7)';
const LINEWIDTH = 3;


function drawPath(ctx, p) {
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);

  p.splice(1).forEach(({ x, y }) => ctx.lineTo(x, y));
  ctx.stroke();
}


function getScene1(ctx, width, height) {
  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const edgeX = width*20/100;
  const edgeY = height*20/100;

  const xMin = edgeX;
  const xMax = width - edgeX;
  const yMin = edgeY;
  const yMax = height - edgeY;

  const num = width / 10;

  function scene1() {
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();
    const path = getRndYLinspaceX(num, xMin, xMax, yMin, yMax);
    drawPath(ctx, path);
  }

  return scene1;
}


function main() {
  print('running main. yess');
  //const tempDiv = document.getElementById('temp');
  //tempDiv.innerHTML = Math.floor(temperatureDisplay) + '°C';

  //window.onresize = function() {
  //  const width = window.innerWidth;
  //  const height = window.innerHeight;
  //  print('resize', width, height);
  //  updateCanvas(testCanvas, width, height);
  //};
  //

  //window.onhashchange = locationHashChanged;


  const width = window.innerWidth;
  const height = window.innerHeight;
  const ctx = updateCanvas(width, height);

  const scenes = {
    '#1': getScene1(ctx, width, height)
  };

  const hash = window.location.hash;
  if (!hash) {
    window.location.hash = '#1';
  } else if (scenes[hash]) {
    const s = scenes[hash];
    animloop(s);
  } else {
    printWarn('No scene?');
  }
}

main();


/*eslint-env browser*/

import { getLinspaceYLinspaceX, getRndYLinspaceX, permuteY } from './random';
import { printInfo, printWarn } from './utils';
import { drawPath } from './draw';

const WHITE = 'rgba(255, 255, 255, 1.0)';
const BLACK = 'rgba(0, 0, 0, 1.0)';
const GRAY = 'rgba(0, 0, 0, 0.7)';
const LINEWIDTH = 3;


export function getScene1(ctx, width, height) {
  printInfo('making scene 1');
  const narative = 'Random numbers';

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

  function scene() {
    printInfo('scene1');
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();
    const path = getRndYLinspaceX(num, xMin, xMax, yMin, yMax);
    drawPath(ctx, path);
  }

  return {
    scene,
    narative
  };
}

export function getScene2(ctx, width, height) {
  printInfo('making scene 2');
  const narative = 'What if the numbers have memory?';

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const edgeX = width*20/100;
  const edgeY = height*20/100;

  const xMin = edgeX;
  const xMax = width - edgeX;
  const yMin = edgeY;
  const yMax = height - edgeY;
  const yMid = (yMax+yMin)*0.5;

  const num = Math.floor(width / 10);

  const noise = 2;

  let path = getLinspaceYLinspaceX(num, xMin, xMax, yMid, yMid);

  function scene() {
    printInfo('scene2');
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    path = permuteY(path, noise);
    drawPath(ctx, path);
  }

  return {
    scene,
    narative
  };
}


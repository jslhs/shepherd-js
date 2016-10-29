/*eslint-env browser*/

import { getLinspaceYLinspaceX, getRndYLinspaceX, permuteY } from './random';
import { printInfo, printWarn } from './utils';
import { drawPath, drawPathDots, clear} from './draw';

const PI = Math.PI;
const TWOPI = Math.PI * 2.0;
const HPI = Math.PI * 0.5;

const WHITE = 'rgba(255, 255, 255, 1.0)';
const BLACK = 'rgba(0, 0, 0, 1.0)';
const GRAY = 'rgba(0, 0, 0, 0.6)';
const LINEWIDTH = 3;


export function getScene1(ctx, width, height) {
  printInfo('making scene 1');
  const narative = 'Here are some Nodes. But they have no <a href="#2">memory</a>';

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = GRAY;
  ctx.lineWidth = LINEWIDTH;

  const edgeX = width*5/100;
  const edgeY = height*20/100;

  const xMin = edgeX;
  const xMax = width - edgeX;
  const yMin = edgeY;
  const yMax = height - edgeY;
  const yMid = (yMax+yMin)*0.5;

  const num = Math.floor(width / 10);
  const dotSize = 3;

  const frames = 30;

  let path1 = getLinspaceYLinspaceX(num, xMin, xMax, yMid, yMid);
  let path2 = getRndYLinspaceX(num, xMin, xMax, yMin, yMax);
  let itt = 0;

  function scene() {
    itt += 1;
    printInfo('scene1');
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    if (itt%frames===0) {
      path1 = path2;
      path2 = getRndYLinspaceX(num, xMin, xMax, yMin, yMax);
    }

    const path = [];
    for (let i = 0; i < num; i++) {
      const y1 = path1[i].y;
      const y2 = path2[i].y;
      path.push({
        x: path1[i].x,
        y: y1 + Math.sin((itt%frames)/frames * HPI)*(y2-y1)
      });
    }
    drawPathDots(ctx, path, dotSize);
  }

  return {
    scene,
    narative
  };
}

export function getScene2(ctx, width, height) {
  printInfo('making scene 2');
  const narative = '';

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const edgeX = width*5/100;
  const edgeY = height*20/100;

  const xMin = edgeX;
  const xMax = width - edgeX;
  const yMin = edgeY;
  const yMax = height - edgeY;
  const yMid = (yMax+yMin)*0.5;

  const num = Math.floor(width / 10);
  const dotSize = 3;

  const noise = 1;

  let path = getLinspaceYLinspaceX(num, xMin, xMax, yMid, yMid);
  let itt = 0;

  function scene() {
    itt += 1;
    printInfo('scene2');
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    path = permuteY(path, noise);
    drawPathDots(ctx, path, dotSize);
  }

  return {
    scene,
    narative
  };
}


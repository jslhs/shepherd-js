/*eslint-env browser*/

import { getLinspaceYLinspaceX, getRndYLinspaceX, permuteY, permute, getNs, limit} from './random';
import { printInfo, printWarn } from './utils';
import { drawPath, drawPathDots, clear} from './draw';

const PI = Math.PI;
const TWOPI = Math.PI * 2.0;
const HPI = Math.PI * 0.5;

const WHITE = 'rgba(255, 255, 255, 1.0)';
const BLACK = 'rgba(0, 0, 0, 1.0)';
const GRAY = 'rgba(0, 0, 0, 0.6)';
const LINEWIDTH = 2;
const THINLINEWIDTH = 1;


export function getScene1(ctx, width, height) {
  printInfo('making scene 1');
  const str = 'Nodes oscillate randomly around the middle'; const narative = `${str} | <a class="next" href="#2">Next</a>`;

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
  const str = 'Nodes oscillate randomly around their previous position.';
  const narative = `<a class="prev" href="#1">Back</a> | ${str} | <a class="next" href="#3">Next</a>`;

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

    // TODO: limit
    path = permuteY(path, noise);
    drawPathDots(ctx, path, dotSize);
  }

  return {
    scene,
    narative
  };
}

export function getScene3(ctx, width, height) {
  printInfo('making scene 3');
  const str = 'Nodes have a velocity. The velocity changes randomly with small increments.';
  const narative = `<a class="prev" href="#2">Back</a> | ${str} | <a class="next" href="#4">Next</a>`;

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

  const noise = 0.1;

  let path = getLinspaceYLinspaceX(num, xMin, xMax, yMid, yMid);
  let velocity = getNs(num, 0);
  let itt = 0;

  function scene() {
    itt += 1;
    printInfo('scene2');
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    //printInfo(velocity)

    velocity = permute(velocity, noise);
    path = path.map(({ x, y }, i) => ({
      x,
      y: limit(y + velocity[i], yMax, yMin)
    }));

    drawPathDots(ctx, path, dotSize);
  }

  return {
    scene,
    narative
  };
}

export function getScene4(ctx, width, height) {
  printInfo('making scene 4');
  const str = 'The velocity changes more when a node is further to the right.';
  const narative = `<a class="prev" href="#3">Back</a> ${str} <a class="next" href="#5">Next</a>`;

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

  const noise = 0.1;

  let path = getLinspaceYLinspaceX(num, xMin, xMax, yMid, yMid);
  let velocity = getNs(num, 0);
  let itt = 0;

  function scene() {
    itt += 1;
    printInfo('scene2');
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    velocity = permute(velocity, noise);
    let s = 0;
    path = path.map(({ x, y }, i) => {
      s += velocity[i];
      return {
        x,
        y: limit(y+s, yMax, yMin)
      };
    });

    drawPathDots(ctx, path, dotSize);
  }

  return {
    scene,
    narative
  };
}

export function getScene5(ctx, width, height) {
  printInfo('making scene 4');
  const str = 'Now we add more nodes.';
  const narative = `<a class="prev" href="#4">Back</a> ${str} <a class="next" href="#6">Next</a>`;

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = THINLINEWIDTH;

  const edgeX = width*5/100;
  const edgeY = height*20/100;

  const xMin = edgeX;
  const xMax = width - edgeX;
  const yMin = edgeY;
  const yMax = height - edgeY;
  const yMid = (yMax+yMin)*0.5;

  const num = Math.floor(width / 4);
  const dotSize = 3;

  const noise = 0.1;

  let path = getLinspaceYLinspaceX(num, xMin, xMax, yMid, yMid);
  let velocity = getNs(num, 0);
  let itt = 0;

  function scene() {
    itt += 1;
    printInfo('scene2');
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    velocity = permute(velocity, noise);
    let s = 0;
    path = path.map(({ x, y }, i) => {
      s += velocity[i];
      return {
        x,
        y: limit(y+s, yMax, yMin)
      };
    });

    drawPath(ctx, path, dotSize);
  }

  return {
    scene,
    narative
  };
}

export function getScene6(ctx, width, height) {
  printInfo('making scene 4');
  const str = 'Expose.';
  const narative = `<a class="prev" href="#5">Back</a> ${str}`;

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = THINLINEWIDTH;

  const edgeX = width*5/100;
  const edgeY = height*20/100;

  const xMin = edgeX;
  const xMax = width - edgeX;
  const yMin = edgeY;
  const yMax = height - edgeY;
  const yMid = (yMax+yMin)*0.5;

  const num = Math.floor(width / 4);
  const dotSize = 3;

  const noise = 0.1;

  let path = getLinspaceYLinspaceX(num, xMin, xMax, yMid, yMid);
  let velocity = getNs(num, 0);
  let itt = 0;

  function scene() {
    itt += 1;
    printInfo('scene2');

    if (itt===1) {
      ctx.fillStyle = WHITE;
      clear(ctx, width, height);
      ctx.fillStyle = GRAY;
    }

    velocity = permute(velocity, noise);
    let s = 0;
    path = path.map(({ x, y }, i) => {
      s += velocity[i];
      return {
        x,
        y: limit(y+s, yMax, yMin)
      };
    });

    drawPath(ctx, path, dotSize);
  }

  return {
    scene,
    narative
  };
}

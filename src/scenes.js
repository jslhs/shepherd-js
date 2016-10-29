/*eslint-env browser*/

import { getLinspaceYLinspaceX, getRndYLinspaceX, permuteY, permute, getNs, limit} from './random';
import { printInfo, printWarn } from './utils';
import { drawDots, drawPath, drawPathDots, clear } from './draw';

const PI = Math.PI;
const TWOPI = Math.PI * 2.0;
const HPI = Math.PI * 0.5;

const WHITE = 'rgba(255, 255, 255, 1.0)';
const BLACK = 'rgba(0, 0, 0, 1.0)';
const GRAY = 'rgba(0, 0, 0, 0.6)';
const LIGHTGRAY = 'rgba(0, 0, 0, 0.05)';

const LINEWIDTH = 2;
const THINLINEWIDTH = 1;

function getBoundary(width, height) {
  const edgeX = width*5/100;
  const edgeTopY = height*0.01;
  const edgeBottomY = height*0.01;

  const xMin = edgeX;
  const xMax = width - edgeX;
  const yMin = edgeTopY;
  const yMax = height - edgeBottomY;
  const yMid = (yMax+yMin)*0.5;
  const xMid = (xMax+xMin)*0.5;
  return {
    xMin, xMax, yMin, yMax, yMid, xMid
  };
}

export function getSceneUniformSingle(ctx, width, height) {
  const narativeStr = 'Here is a single Node that oscillate randomly around a center';
  const narativeNav = {
    next: 'multi'
  };

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = GRAY;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = 1;
  const dotSize = 20;

  const frames = 30;

  let path1 = getLinspaceYLinspaceX(num, boundary.xMid, boundary.xMid, boundary.yMid, boundary.yMid);
  let path2 = getRndYLinspaceX(num, boundary.xMid, boundary.xMid, boundary.yMin, boundary.yMax);
  let itt = 0;

  function scene() {
    itt += 1;
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    if (itt%frames===0) {
      path1 = path2;
      path2 = getRndYLinspaceX(num, boundary.xMid, boundary.xMid, boundary.yMin, boundary.yMax);
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
    drawDots(ctx, path, dotSize);
  }

  return {
    scene,
    narativeStr,
    narativeNav
  };
}


export function getSceneUniformMulti(ctx, width, height) {
  const narativeStr = 'Several nodes that oscillate in the same way.';
  const narativeNav = {
    prev: 'single',
    next: 'multi-local'
  };

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = GRAY;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 10);
  const dotSize = 3;

  const frames = 30;

  let path1 = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let path2 = getRndYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMin, boundary.yMax);
  let itt = 0;

  function scene() {
    itt += 1;
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    if (itt%frames===0) {
      path1 = path2;
      path2 = getRndYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMin, boundary.yMax);
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
    narativeStr,
    narativeNav
  };
}

export function getSceneUniformLocal(ctx, width, height) {
  const narativeStr = 'Nodes oscillate randomly around their previous position.';
  const narativeNav = {
    prev: 'multi',
    next: 'multi-velocity'
  };

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 10);
  const dotSize = 3;

  const noise = 1;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let itt = 0;

  function scene() {
    itt += 1;
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    // TODO: limit
    path = permuteY(path, noise);
    drawPathDots(ctx, path, dotSize);
  }

  return {
    scene,
    narativeStr,
    narativeNav
  };
}

export function getSceneUniformVel(ctx, width, height) {
  const narativeStr = 'Nodes have a velocity. The velocity changes randomly with small increments.';
  const narativeNav = {
    prev: 'multi-local',
    next: 'multi-varying-velocity'
  };

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 10);
  const dotSize = 3;

  const noise = 0.1;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let velocity = getNs(num, 0);
  let itt = 0;

  function scene() {
    itt += 1;
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    velocity = permute(velocity, noise);
    path = path.map(({ x, y }, i) => ({
      x,
      y: limit(y + velocity[i], boundary.yMax, boundary.yMin)
    }));

    drawPathDots(ctx, path, dotSize);
  }

  return {
    scene,
    narativeStr,
    narativeNav
  };
}

export function getSceneXVel(ctx, width, height) {
  const narativeStr = 'The velocity changes more when a node is further to the right.';
  const narativeNav = {
    prev: 'multi-velocity',
    next: 'multi-varying-velocity-high'
  };

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 10);
  const dotSize = 3;

  const noise = 0.1;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let velocity = getNs(num, 0);
  let itt = 0;

  function scene() {
    itt += 1;
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    velocity = permute(velocity, noise);
    let s = 0;
    path = path.map(({ x, y }, i) => {
      s += velocity[i];
      return {
        x,
        y: limit(y+s, boundary.yMax, boundary.yMin)
      };
    });

    drawPathDots(ctx, path, dotSize);
  }

  return {
    scene,
    narativeStr,
    narativeNav
  };
}

export function getSceneXVelHigh(ctx, width, height) {
  const narativeStr = 'Now we add more nodes.';
  const narativeNav = {
    prev: 'multi-varying-velocity',
    next: 'multi-varying-velocity-expose'
  };

  ctx.strokeStyle = LINEWIDTH;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = THINLINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 4);
  const dotSize = 3;

  const noise = 0.01;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let velocity = getNs(num, 0);
  let itt = 0;

  function scene() {
    itt += 1;
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    velocity = permute(velocity, noise);
    let s = 0;
    path = path.map(({ x, y }, i) => {
      s += velocity[i];
      return {
        x,
        y: limit(y+s, boundary.yMax, boundary.yMin)
      };
    });

    drawPath(ctx, path, dotSize);
  }

  return {
    scene,
    narativeStr,
    narativeNav
  };
}

export function getSceneXVelExpose(ctx, width, height) {
  const narativeStr = 'Expose.';
  const narativeNav = {
    prev: 'multi-varying-velocity-high'
  };

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = THINLINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 7);
  const dotSize = 3;

  const noise = 0.01;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let velocity = getNs(num, 0);
  let itt = 0;

  function scene() {
    itt += 1;

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
        y: limit(y+s, boundary.yMax, boundary.yMin)
      };
    });

    drawPath(ctx, path, dotSize);
  }

  return {
    scene,
    narativeStr,
    narativeNav
  };
}

/*eslint-env browser*/

import { getLinspaceYLinspaceX, getRndYLinspaceX, getCirc, getRndCirc,
  permuteY, permute, getNs, limit } from './array';
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
  const edgeTopY = height*0.2;
  const edgeBottomY = height*0.2;

  const xl = 0;
  const xr = width;
  const yb = height;
  const yt = 0;
  const xMin = edgeX;
  const xMax = width - edgeX;
  const yMin = edgeTopY;
  const yMax = height - edgeBottomY;
  const yMid = (yMax+yMin)*0.5;
  const xMid = (xMax+xMin)*0.5;
  return {
    xMin, xMax, yMin, yMax, yMid, xMid, xl, xr, yb, yt
  };
}

export function getSceneUniformSingle(ctx, width, height) {
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
    const y1 = path1[0].y;
    const y2 = path2[0].y;
    path.push({
      x: path1[0].x,
      y: y1 + Math.sin((itt%frames)/frames * HPI)*(y2-y1)
    });
    drawDots(ctx, path, dotSize, true);
    drawDots(ctx, path2, dotSize, false);
  }

  return scene;
}


export function getSceneUniformMulti(ctx, width, height) {
  ctx.strokeStyle = GRAY;
  ctx.fillStyle = GRAY;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 20);
  const dotSize = 4;
  const frames = 120;

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
    drawDots(ctx, path, dotSize, true);
    drawDots(ctx, path2, dotSize, false);
  }

  return scene;
}

export function getSceneUniformLocal(ctx, width, height) {
  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 20);
  const dotSize = 4;
  const noise = 2;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);

  function scene() {
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    // TODO: limit
    path = permuteY(path, noise);
    drawDots(ctx, path, dotSize, true);
  }

  return scene;
}

export function getSceneUniformVel(ctx, width, height) {
  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 20);
  const dotSize = 4;
  const noise = 0.1;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let velocity = getNs(num, 0);

  function scene() {
    ctx.fillStyle = WHITE;
    clear(ctx, width, height);
    ctx.fillStyle = GRAY;

    velocity = permute(velocity, noise);
    path = path.map(({ x, y }, i) => ({
      x,
      y: limit(y + velocity[i], boundary.yMax, boundary.yMin)
    }));

    velocity.forEach((v, i) => {
      ctx.beginPath();
      ctx.moveTo(path[i].x, path[i].y);
      ctx.lineTo(path[i].x, path[i].y + 20*velocity[i]);
      ctx.stroke();
    });

    drawDots(ctx, path, dotSize, true);
  }

  return scene;
}

export function getSceneXVel(ctx, width, height) {
  ctx.strokeStyle = GRAY;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = LINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 20);
  const dotSize = 4;
  const noise = 0.01;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let velocity = getNs(num, 0);

  function scene() {
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

    s = 0;
    velocity.forEach((v, i) => {
      s += velocity[i];
      ctx.beginPath();
      ctx.moveTo(path[i].x, path[i].y);
      ctx.lineTo(path[i].x, path[i].y + 30*s);
      ctx.stroke();
    });

    drawDots(ctx, path, dotSize, true);
  }

  return scene;
}

export function getSceneXVelHigh(ctx, width, height) {
  ctx.strokeStyle = LINEWIDTH;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = THINLINEWIDTH;

  const boundary = getBoundary(width, height);

  const num = Math.floor(width / 4);
  const dotSize = 3;
  const noise = 0.005;

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

    s = 0;
    velocity.forEach((v, i) => {
      s += velocity[i];
      ctx.beginPath();
      ctx.moveTo(path[i].x, path[i].y);
      ctx.lineTo(path[i].x, path[i].y + 40*s);
      ctx.stroke();
    });

    drawDots(ctx, path, dotSize, true);
  }

  return scene;
}

export function getSceneXVelExpose(ctx, width, height) {
  ctx.lineWidth = THINLINEWIDTH;

  ctx.fillStyle = WHITE;
  clear(ctx, width, height);

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = 'rgba(0,0,0,0.05)';

  const boundary = getBoundary(width, height);

  const num = Math.floor(width);
  const dotSize = 1.0;
  const noise = 0.01;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let velocity = getNs(num, 0);

  function scene() {
    velocity = permute(velocity, noise);
    let s = 0;
    path = path.map(({ x, y }, i) => {
      s += velocity[i];
      return {
        x,
        y: limit(y+s, boundary.yb, boundary.yt)
      }; });

    drawDots(ctx, path, dotSize, true);
  }
  return scene;
}

export function getSceneXYVelExpose(ctx, width, height) {
  ctx.lineWidth = THINLINEWIDTH;

  ctx.fillStyle = WHITE;
  clear(ctx, width, height);

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = 'rgba(0,0,0,0.05)';

  const boundary = getBoundary(width, height);

  const num = Math.floor(width);
  const dotSize = 1.0;
  const noise = 0.01;

  let path = getLinspaceYLinspaceX(num, boundary.xMin, boundary.xMax, boundary.yMid, boundary.yMid);
  let velx = getNs(num, 0);
  let vely = getNs(num, 0);

  function scene() {
    velx = permute(velx, noise);
    vely = permute(vely, noise);
    let sx = 0;
    let sy = 0;
    path = path.map(({ x, y }, i) => {
      sx+= velx[i];
      sy+= vely[i];
      return {
        x: limit(x+sx, boundary.xr, boundary.xl),
        y: limit(y+sy, boundary.yb, boundary.yt)
      }; });

    drawDots(ctx, path, dotSize, true);
  }
  return scene;
}

export function getSceneCircVelExpose(ctx, width, height) {
  ctx.lineWidth = THINLINEWIDTH;

  ctx.fillStyle = WHITE;
  clear(ctx, width, height);

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = 'rgba(0,0,0,0.05)';

  const boundary = getBoundary(width, height);

  const num = Math.floor(width);
  const dotSize = 1.0;
  const noise = 0.01;

  const rad = Math.min(width*0.2, height*0.2);

  let path = getCirc(num, boundary.xMid, boundary.yMid, rad);
  let velx = getNs(num, 0);
  let vely = getNs(num, 0);

  function scene() {
    velx = permute(velx, noise);
    vely = permute(vely, noise);
    let sx = 0;
    let sy = 0;
    path = path.map(({ x, y }, i) => {
      sx+= velx[i];
      sy+= vely[i];
      return {
        x: limit(x+sx, boundary.xr, boundary.xl),
        y: limit(y+sy, boundary.yb, boundary.yt)
      }; });

    drawDots(ctx, path, dotSize, true);
  }
  return scene;
}

export function getSceneRndCircVelExpose(ctx, width, height) {
  ctx.lineWidth = THINLINEWIDTH;

  ctx.fillStyle = WHITE;
  clear(ctx, width, height);

  ctx.strokeStyle = GRAY;
  ctx.fillStyle = 'rgba(0,0,0,0.05)';

  const boundary = getBoundary(width, height);

  const num = Math.floor(width);
  const dotSize = 1.0;
  const noise = 0.01;

  const rad = Math.min(width*0.2, height*0.2);

  let path = getRndCirc(num, boundary.xMid, boundary.yMid, rad);
  let velx = getNs(num, 0);
  let vely = getNs(num, 0);

  function scene() {
    velx = permute(velx, noise);
    vely = permute(vely, noise);
    let sx = 0;
    let sy = 0;
    path = path.map(({ x, y }, i) => {
      sx+= velx[i];
      sy+= vely[i];
      return {
        x: limit(x+sx, boundary.xr, boundary.xl),
        y: limit(y+sy, boundary.yb, boundary.yt)
      }; });

    drawDots(ctx, path, dotSize, true);
  }
  return scene;
}

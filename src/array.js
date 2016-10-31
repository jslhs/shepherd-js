
import { printInfo, printWarn } from './utils';

const TWOPI = 2.0*Math.PI;

export function getNs(n, v) { const res = [];
  for (let i = 0; i < n; i++) {
    res.push(v);
  }
  return res;
}

export function getRnd(n, min, max) {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(
      min + (Math.random() * (max - min))
    );
  }
  return res;
}

export function getRndYLinspaceX(n, xMin, xMax, yMin, yMax) {
  const res = [];
  const s = (xMax - xMin) / n;
  let x = xMin;
  for (let i = 0; i < n; i++) {
    res.push({
      x,
      y: yMin + (Math.random() * (yMax - yMin))
    });
    x += s;
  }
  return res;
}


export function getLinspaceYLinspaceX(n, xMin, xMax, yMin, yMax) {
  const res = [];
  const sX = (xMax - xMin) / n;
  const sY = (yMax - yMin) / n;
  let x = xMin;
  let y = yMin;

  for (let i = 0; i < n; i++) {
    res.push({ x, y });
    x += sX;
    y += sY;
  }
  return res;
}

export function getCirc(n, ix, iy, rad) {
  const res = [];
  const d = TWOPI/n;
  let a = 0;
  for (let i = 0; i < n; i++) {
    const x = ix + Math.cos(a)*rad;
    const y = iy + Math.sin(a)*rad;
    res.push({ x, y });
    a += d;
  }
  return res;
}

export function getRndCirc(n, ix, iy, rad) {
  const res = [];
  for (let i = 0; i < n; i++) {
    const a = Math.random()*TWOPI;
    const x = ix + Math.cos(a)*rad;
    const y = iy + Math.sin(a)*rad;
    res.push({ x, y });
  }
  return res;
}

export function getRndRect(n, left, right, bottom, top) {
  const res = [];
  for (let i = 0; i < n; i++) {
    const x = left + Math.random()*(right-left);
    const y = bottom + Math.random()*(top-bottom);
    res.push({ x, y });
  }
  return res;
}

export function permuteY(path, noise) {
  const newPath = path.map(({ x, y }) => {
    const rnd = (1.0-2*Math.random())*noise;
    return ({
      x,
      y: y + rnd
    });
  });
  return newPath;
}

export function permute(arr, noise) {
  const newArr = arr.map((v) => {
    const rnd = (1.0-2*Math.random())*noise;
    return v + rnd;
  });
  return newArr;
}

export function limit(v, ma, mi) {
  return Math.max(Math.min(v, ma), mi);
}


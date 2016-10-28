
import { printInfo, printWarn } from './utils';

//function getRndTup(n, a, b) {
//  const res = [];
//  for (let i = 0; i < n; i++) {
//    res.push({
//      x: Math.random() * a,
//      y: Math.random() * b
//    });
//  }
//  return res;
//}


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

export function permuteY(path, noise) {
  const newPath = path.map(({ x, y }) => {
    const rnd = (1.0-2*Math.random())*noise;
    return ({
      x,
      y: y + rnd
    });
  });
  //return newPath;
  //printInfo('permute', path.length);
  //return newPath;
  return newPath;
}


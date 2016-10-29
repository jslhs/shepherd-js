
import { printInfo, printWarn } from './utils';

const PI = Math.PI;
const TWOPI = Math.PI * 2.0;
const HPI = Math.PI * 0.5;

export function drawPath(ctx, p) {
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);
  for (let i = 1; i < p.length; i++) {
    ctx.lineTo(p[i].x, p[i].y);
  }
  ctx.stroke();
}

export function drawDots(ctx, p, rad) {
  for (let i = 0; i < p.length; i++) {
    const x = p[i].x;
    const y = p[i].y;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, TWOPI);
    ctx.fill();
  }
}

export function drawPathDots(ctx, p, rad) {
  const num = 1;
  for (let i = 1; i < p.length; i++) {
    const x2 = p[i].x;
    const y2 = p[i].y;
    const x1 = p[i-1].x;
    const y1 = p[i-1].y;
    //const dx = (x2-x1)/num;
    //const dy = (y2-y1)/num;
    //let x = x1;
    //let y = y1;
    for (let k = 0; k < num; k++) {
      ctx.beginPath();
      //ctx.moveTo(x1 + Math.random()*dx, y1 + Math.random()*dy);
      //ctx.lineTo(x2 - Math.random()*dx, y2 - Math.random()*dy);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(p[i].x, p[i].y, rad, 0, TWOPI);
    ctx.fill();
  }
  //drawPath(ctx, p);
}

export function clear(ctx, width, height) {
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.fill();
}

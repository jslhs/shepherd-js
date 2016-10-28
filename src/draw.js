
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

export function drawPathDots(ctx, p, rad) {
  for (let i = 1; i < p.length; i++) {
    ctx.beginPath();
    ctx.arc(p[i].x, p[i].y, rad, 0, TWOPI);
    ctx.fill();
  }
  drawPath(ctx, p);
}

export function clear(ctx, width, height) {
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.fill();
}

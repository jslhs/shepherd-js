/*eslint-env browser*/


import { printInfo, printWarn, updateCanvas, play } from './utils';
import * as scene from './scenes';


function nav(scenes, ctx, width, height) {
  const hash = window.location.hash;
  if (!hash) {
    window.location.hash = '#single';
  } else if (scenes[hash]) {
    const s = scenes[hash](ctx, width, height);
    play(s);
  } else {
    printWarn('No scene?');
    window.location.hash = '#single';
  }
}

window.onresize = () => {
  printInfo('resize');
  main();
};

function getCanvasSize() {
  const width = Math.max(window.innerWidth, 320);
  const height = Math.max(window.innerHeight*0.8, 500);
  return {
    width, height
  };
}


function main() {
  printInfo('running main. yess');

  const cs = getCanvasSize();
  const ctx = updateCanvas(cs.width, cs.height);

  const scenes = {
    '#single': scene.getSceneUniformSingle,
    '#multi': scene.getSceneUniformMulti,
    '#multi-local': scene.getSceneUniformLocal,
    '#multi-velocity': scene.getSceneUniformVel,
    '#multi-varying-velocity': scene.getSceneXVel,
    '#multi-varying-velocity-high': scene.getSceneXVelHigh,
    '#multi-varying-velocity-expose': scene.getSceneXVelExpose
  };

  nav(scenes, ctx, cs.width, cs.height);

  window.onhashchange = () => {
    printInfo('hash change');
    nav(scenes, ctx, cs.width, cs.height);
  };
}

main();


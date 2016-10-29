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


function main() {
  printInfo('running main. yess');

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ctx = updateCanvas(width, height);

  const scenes = {
    '#single': scene.getSceneUniformSingle,
    '#multi': scene.getSceneUniformMulti,
    '#multi-local': scene.getSceneUniformLocal,
    '#multi-velocity': scene.getSceneUniformVel,
    '#multi-varying-velocity': scene.getSceneXVel,
    '#multi-varying-velocity-high': scene.getSceneXVelHigh,
    '#multi-varying-velocity-expose': scene.getSceneXVelExpose
  };

  nav(scenes, ctx, width, height);

  window.onhashchange = () => {
    printInfo('hash change');
    nav(scenes, ctx, width, height);
  };
}

main();


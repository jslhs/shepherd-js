/*eslint-env browser*/


import './sass/main.scss';
import { printInfo, printWarn, updateCanvas, animloop, getCanvasSize } from './utils';
import * as scene from './scenes';


window.onresize = () => {
  printInfo('resize');
  main();
};


function main() {
  printInfo('running main. yess');

  const cs = getCanvasSize();

  const story = {
    introduction: scene.getSceneUniformSingle,
    multiple: scene.getSceneUniformMulti,
    memory: scene.getSceneUniformLocal,
    velocity: scene.getSceneUniformVel,
    'sums-of-velocities': scene.getSceneXVel,
    'more-nodes-again': scene.getSceneXVelHigh,
    history: scene.getSceneXVelExpose
  };

  Object.keys(story).map((sceneName) => {
    printInfo(`updating: ${sceneName}`);
    const ctx = updateCanvas(cs.width, cs.height, sceneName);
    const f = story[sceneName](ctx, cs.width, cs.height);
    animloop(f);
  });
}

main();


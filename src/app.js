/*eslint-env browser*/


import './sass/main.scss';
import { printInfo, updateAndStartCanvas, getCanvasSize } from './utils';
import * as scene from './scenes';


//window.onresize = () => {
//  printInfo('resize');
//  main();
//};

function main() {
  printInfo('running main. yess');

  const cs = getCanvasSize();

  if (!window.drawings) {
    window.drawings = {};
  }

  const story = {
    introduction: scene.getSceneUniformSingle,
    multiple: scene.getSceneUniformMulti,
    memory: scene.getSceneUniformLocal,
    velocity: scene.getSceneUniformVel,
    'sums-of-velocities': scene.getSceneXVel,
    'more-nodes-again': scene.getSceneXVelHigh,
    history: scene.getSceneXVelExpose
  };

  Object.keys(story).forEach((sceneName) => {
    printInfo(`updating: ${sceneName}`);
    updateAndStartCanvas(cs.width, cs.height, sceneName, story[sceneName]);
  });
}

main();


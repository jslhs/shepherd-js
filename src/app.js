/*eslint-env browser*/


import { printInfo, printWarn, updateCanvas, play } from './utils';
import * as scene from './scenes';


function nav(story, ctx, width, height) {
  const hash = window.location.hash.slice(1);
  if (!hash) {
    window.location.hash = '#single';
  } else if (story[hash]) {
    const s = story[hash];
    const f = s.scene(ctx, width, height);
    play(s, f);
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
  const height = Math.max(window.innerHeight*0.6, 500);
  return {
    width, height
  };
}


function main() {
  printInfo('running main. yess');

  const cs = getCanvasSize();
  const ctx = updateCanvas(cs.width, cs.height);

  const story = {
    single: {
      scene: scene.getSceneUniformSingle,
      narative: 'Here is a single Node that oscillate randomly around a center',
      nav: {
        next: 'multi'
      }
    },
    multi: {
      scene: scene.getSceneUniformMulti,
      narative: 'Several nodes that oscillate in the same way.',
      nav: {
        prev: 'single',
        next: 'multi-local'
      }
    },
    'multi-local': {
      scene: scene.getSceneUniformLocal,
      narative: 'Nodes oscillate randomly around their previous position.',
      nav: {
        prev: 'multi',
        next: 'multi-velocity'
      }
    },
    'multi-velocity': {
      scene: scene.getSceneUniformVel,
      narative: 'Nodes have a velocity. The velocity changes randomly with small increments.',
      nav: {
        prev: 'multi-local',
        next: 'multi-varying-velocity'
      }
    },
    'multi-varying-velocity': {
      scene: scene.getSceneXVel,
      narative: 'The velocity changes more when a node is further to the right.',
      nav: {
        prev: 'multi-velocity',
        next: 'multi-varying-velocity-high'
      }
    },
    'multi-varying-velocity-high': {
      scene: scene.getSceneXVelHigh,
      narative: 'Now we add more nodes.',
      nav: {
        prev: 'multi-varying-velocity',
        next: 'multi-varying-velocity-expose'
      }
    },
    'multi-varying-velocity-expose': {
      scene: scene.getSceneXVelExpose,
      narative: 'Expose.',
      nav: {
        prev: 'multi-varying-velocity-high'
      }
    }
  };

  nav(story, ctx, cs.width, cs.height);

  window.onhashchange = () => {
    printInfo('hash change');
    nav(story, ctx, cs.width, cs.height);
  };
}

main();


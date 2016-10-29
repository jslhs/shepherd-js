/*eslint-env browser*/


import './sass/main.scss';
import { printInfo, printWarn, updateCanvas,
  doNav, getCanvasSize } from './utils';
import * as scene from './scenes';


window.onresize = () => {
  printInfo('resize');
  main();
};


function main() {
  printInfo('running main. yess');

  const cs = getCanvasSize();
  const ctx = updateCanvas(cs.width, cs.height);

  const story = {
    single: {
      title: 'Random Node',
      scene: scene.getSceneUniformSingle,
      narative: `<p>Here is a single Node that oscillate randomly around a
      center</p>`,
      nav: {
        next: 'multi'
      }
    },
    multi: {
      title: 'Multiple',
      scene: scene.getSceneUniformMulti,
      narative: '<p>Several nodes that oscillate in the same way.</p>',
      nav: {
        prev: 'single',
        next: 'multi-local'
      }
    },
    'multi-local': {
      title: 'Local Oscilation',
      scene: scene.getSceneUniformLocal,
      narative: `<p>Nodes oscillate randomly around their previous
      position.</p>`,
      nav: {
        prev: 'multi',
        next: 'multi-velocity'
      }
    },
    'multi-velocity': {
      title: 'Velocity',
      scene: scene.getSceneUniformVel,
      narative: `<p>Instead of simply letting the nodes move randomly relative
      to their previous positions we now introduce a velcity. For each step the
      nodes will move slightly according to their velocity. All nodes start
      with a velocity of zero.</p>
      <p>To make things a little more interesting we manipulate the velocity in
      the same way that we did nodes in the previous example. That means that
      the velocities will osciallate gradually.  Velocities can be either
      positive or negative.</p>`,
      nav: {
        prev: 'multi-local',
        next: 'multi-varying-velocity'
      }
    },
    'multi-varying-velocity': {
      title: '',
      scene: scene.getSceneXVel,
      narative: `<p>Nodes have a varying velocity, before. However, now the
      velocity of a given node is the sum of all the velocities of the nodes on
      it' left .<p>`,
      nav: {
        prev: 'multi-velocity',
        next: 'multi-varying-velocity-high'
      }
    },
    'multi-varying-velocity-high': {
      title: '',
      scene: scene.getSceneXVelHigh,
      narative: '<p>Now we add more nodes.</p>',
      nav: {
        prev: 'multi-varying-velocity',
        next: 'multi-varying-velocity-expose'
      }
    },
    'multi-varying-velocity-expose': {
      title: '',
      scene: scene.getSceneXVelExpose,
      narative: 'Expose.',
      nav: {
        prev: '<p>multi-varying-velocity-high</p>'
      }
    }
  };

  doNav(story, ctx, cs.width, cs.height);

  window.onhashchange = () => {
    printInfo('hash change');
    doNav(story, ctx, cs.width, cs.height);
  };
}

main();


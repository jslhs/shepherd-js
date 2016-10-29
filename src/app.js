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
      narative: `<p>A is a single node that moves between random
      positions.</p>`,
      nav: {
        next: 'multi'
      }
    },
    multi: {
      title: 'Multiple',
      scene: scene.getSceneUniformMulti,
      narative: `<p>It is always useful to see what happens when we introduce
      more things. Here are multiple nodes that move in the same way as
      before.</p>`,
      nav: {
        prev: 'single',
        next: 'multi-local'
      }
    },
    'multi-local': {
      title: 'Memory',
      scene: scene.getSceneUniformLocal,
      narative: `<p>The nodes still move at random. However, now they move
      relative to their previous position&mdash;as if they have developed a
      simple kind of memory.</p>
      <p>When ever a node reaches the edge of the canvas we stop it's motion.
      Until it should be inclined to start moving in the opposite
      direction.</p>`,
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
      the velocities will change gradually. Velocities can be either
      positive or negative.</p>`,
      nav: {
        prev: 'multi-local',
        next: 'multi-varying-velocity'
      }
    },
    'multi-varying-velocity': {
      title: 'Sums of Velocities',
      scene: scene.getSceneXVel,
      narative: `<p>Nodes have a varying velocity, before. However, now the
      velocity of a given node is the sum of all the velocities of the nodes on
      it's left.<p>`,
      nav: {
        prev: 'multi-velocity',
        next: 'multi-varying-velocity-high'
      }
    },
    'multi-varying-velocity-high': {
      title: 'More Nodes. Again',
      scene: scene.getSceneXVelHigh,
      narative: `<p>It is time to intrduce even more nodes.</p>
      <p>Now it is a little easier to see the pattern.</p>`,
      nav: {
        prev: 'multi-varying-velocity',
        next: 'multi-varying-velocity-expose'
      }
    },
    'multi-varying-velocity-expose': {
      title: 'Through Time',
      scene: scene.getSceneXVelExpose,
      narative: 'Expose.',
      nav: {
        prev: 'multi-varying-velocity-high'
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


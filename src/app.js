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
      scene: scene.getSceneUniformSingle,
      narative: `<h2>Introduction</h2>

      <p>The following is a tiny guide to shepherding random numbers. It does
      not really deal with statistics or probablility, it is simply a few
      useful tricks I've learnt for manipulating random numbers, so that they
      behave in a pleasing manner.</p>

      <h2>Random Node</h2>

      <p>We start with something very simple: a single node that moves between
      random positions.</p>`,
      nav: {
        next: 'multi'
      }
    },
    multi: {
      scene: scene.getSceneUniformMulti,
      narative: `<h2>Multiple</h2>

      <p>It is always useful to see what happens when we introduce more things.
      Here are multiple nodes that move in the same way as before. Note that
      all these nodes behave completely unrelated to one another</p>`,
      nav: {
        prev: 'single',
        next: 'multi-local'
      }
    },
    'multi-local': {
      scene: scene.getSceneUniformLocal,
      narative: `<h2>Memory</h2>

      <p>The nodes still move at random. However, now they move relative to
      their previous position&mdash;as if they have developed a simple kind of
      memory.</p>

      <p>Sudenly it looks as if all the nodes are very nervous about
      something.<p>

      <p>When we look at this it can sometimes seem as if there is a pattern
      emerging from the behaviour. But if you feel like you can see such a
      pattern it is entirely coincidental since the nodes are completely
      unaware of each other</p>

      <p>Whenever a node reaches the edge of the canvas we stop it's motion.
      Until it should be inclined to start moving in the opposite
      direction.</p>`,
      nav: {
        prev: 'multi',
        next: 'multi-velocity'
      }
    },
    'multi-velocity': {
      scene: scene.getSceneUniformVel,
      narative: `<h2>Velocity</h2>

      <p>Instead of simply letting the nodes move randomly relative to their
      previous positions we now introduce a velcity. For each step the nodes
      will move slightly according to their velocity. All nodes start with a
      velocity of zero.</p>

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
      scene: scene.getSceneXVel,
      narative: `<h2>Sums of Velocities<h2>

      <p>Nodes have a varying velocity, before. However, now the velocity of a
      given node is the sum of all the velocities of the nodes on it's
      left.<p>`,
      nav: {
        prev: 'multi-velocity',
        next: 'multi-varying-velocity-high'
      }
    },
    'multi-varying-velocity-high': {
      scene: scene.getSceneXVelHigh,
      narative: `<h2>More Nodes. Again</h2>

      <p>It is time to intrduce even more nodes.</p>

      <p>Now it is a little easier to see the pattern.</p>`,
      nav: {
        prev: 'multi-varying-velocity',
        next: 'multi-varying-velocity-expose'
      }
    },
    'multi-varying-velocity-expose': {
      scene: scene.getSceneXVelExpose,
      narative: `<h2>Through Time</h2>

      <p>Expose.</p>`,
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


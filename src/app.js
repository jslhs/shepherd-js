/*eslint-env browser*/


import { printInfo, printWarn, updateCanvas, play } from './utils';
import { getScene1, getScene2, getScene3, getScene4, getScene5, getScene6 } from './scenes';


function nav(scenes) {
  const hash = window.location.hash;
  if (!hash) {
    window.location.hash = '#1';
  } else if (scenes[hash]) {
    const s = scenes[hash];
    play(s);
  } else {
    printWarn('No scene?');
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
    '#1': getScene1(ctx, width, height),
    '#2': getScene2(ctx, width, height),
    '#3': getScene3(ctx, width, height),
    '#4': getScene4(ctx, width, height),
    '#5': getScene5(ctx, width, height),
    '#6': getScene6(ctx, width, height)
  };

  nav(scenes);

  window.onhashchange = () => {
    printInfo('hash change');
    nav(scenes);
  };
}

main();


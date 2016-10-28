/*eslint-env browser*/


import { printInfo, printWarn, updateCanvas, play } from './utils';
import { getScene1, getScene2 } from './scenes';


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

function main() {
  printInfo('running main. yess');
  //const tempDiv = document.getElementById('temp');
  //tempDiv.innerHTML = Math.floor(temperatureDisplay) + '°C';

  //window.onresize = function() {
  //  const width = window.innerWidth;
  //  const height = window.innerHeight;
  //  printInfo('resize', width, height);
  //  updateCanvas(testCanvas, width, height);
  //};
  //


  const width = window.innerWidth;
  const height = window.innerHeight;
  const ctx = updateCanvas(width, height);

  const scenes = {
    '#1': getScene1(ctx, width, height),
    '#2': getScene2(ctx, width, height)
  };

  nav(scenes);

  window.onhashchange = () => {
    nav(scenes);
  };
}

main();


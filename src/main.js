
function randInt(n) {
  return Math.floor(Math.random() * n);
}

function getRnd(o, s) {
  const a = o + s * (1.0 - 2.0 * Math.random());
  if (a > 1.0) {
    return 1.0;
  } else if (a < 0.0) {
    return 0.0;
  }
  return a;
}


function main() {
  //const tempDiv = document.getElementById('temp');
    //tempDiv.innerHTML = Math.floor(temperatureDisplay) + '°C';
  //
  function animloop(){
  }

    setTimeout(() => {
      animloop();
    }, 300);
  }

  animloop();
}

main();


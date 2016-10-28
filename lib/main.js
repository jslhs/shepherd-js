'use strict';

/*eslint-env browser*/

var WHITE = '#fff';
var BLACK = '#000';

function print() {
  var s = '';
  for (var i = 0; i < arguments.length; i++) {
    s = s + ' ' + JSON.stringify(arguments[i]);
  }
  console.log(s);
}

function randInt(a, b) {
  return a + Math.floor(Math.random() * (b - a));
}

function getRndTup(n, a, b) {
  var res = [];
  for (var i = 0; i < n; i++) {
    res.push({
      x: Math.random() * a,
      y: Math.random() * b
    });
  }
  return res;
}

function drawPath(ctx, p) {
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);

  p.splice(1).forEach(function (_ref) {
    var x = _ref.x,
        y = _ref.y;

    ctx.lineTo(x, y);
    return;
  });
  ctx.stroke();
}

function drawState(ctx, state) {
  state.map(function (s) {
    return drawPath(s);
  });
}

function scene1(ctx, width, height) {
  print('test canvas');
  var n = 10;
  var rnd = getRndTup(n);
}

function updateCanvas(width, height) {
  var canvasStr = '<canvas width="' + width + '" height="' + height + '" id="drawing"></canvas>';
  document.getElementById('box').innerHTML = canvasStr;
  var canvas = document.getElementById('drawing');
  var ctx = canvas.getContext('2d');
  return ctx;
}

function main() {
  //const tempDiv = document.getElementById('temp');
  //tempDiv.innerHTML = Math.floor(temperatureDisplay) + '°C';

  //window.onresize = function() {
  //  const width = window.innerWidth;
  //  const height = window.innerHeight;
  //  print('resize', width, height);
  //  updateCanvas(testCanvas, width, height);
  //};

  var width = window.innerWidth;
  var height = window.innerHeight;

  var ctx = updateCanvas(width, height);
  ctx.strokeStyle = BLACK;

  var scenes = {
    1: {
      state: [getRndTup(10, width, height)],
      updateState: function updateState() {
        return [getRndTup(10, width, height)];
      },
      anim: scene1
    }
  };

  updateCanvas(scenes, width, height);

  //function animloop(){
  //}

  //setTimeout(() => {
  //  animloop();
  //}, 300);

  //animloop();
}

main();
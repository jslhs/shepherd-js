!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/bin/",__webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";function drawPath(ctx,p){ctx.beginPath(),ctx.moveTo(p[0].x,p[0].y),p.splice(1).forEach(function(_ref){var x=_ref.x,y=_ref.y;return ctx.lineTo(x,y)}),ctx.stroke()}function getScene1(ctx,width,height){function scene1(){ctx.beginPath(),ctx.rect(0,0,width,height),ctx.fill();var path=(0,_random.getRndYLinspaceX)(num,xMin,xMax,yMin,yMax);drawPath(ctx,path)}ctx.strokeStyle=GRAY,ctx.fillStyle=WHITE,ctx.lineWidth=LINEWIDTH;var edgeX=20*width/100,edgeY=20*height/100,xMin=edgeX,xMax=width-edgeX,yMin=edgeY,yMax=height-edgeY,num=width/10;return scene1}function main(){(0,_utils.print)("running main. yess");var width=window.innerWidth,height=window.innerHeight,ctx=(0,_utils.updateCanvas)(width,height),scenes={"#1":getScene1(ctx,width,height)},hash=window.location.hash;if(hash)if(scenes[hash]){var s=scenes[hash];(0,_utils.animloop)(s)}else(0,_utils.printWarn)("No scene?");else window.location.hash="#1"}var _random=__webpack_require__(1),_utils=__webpack_require__(2),WHITE="rgba(255, 255, 255, 1.0)",GRAY="rgba(0, 0, 0, 0.7)",LINEWIDTH=3;main()},function(module,exports){"use strict";function getRndYLinspaceX(n,xMin,xMax,yMin,yMax){for(var res=[],s=(xMax-xMin)/n,x=xMin,i=0;i<n;i++)res.push({x:x,y:yMin+Math.random()*(yMax-yMin)}),x+=s;return res}function getLinspaceYLinspaceX(n,xMin,xMax,yMin,yMax){for(var res=[],sX=(xMax-xMin)/n,sY=(yMax-yMin)/n,x=xMin,y=yMin,i=0;i<n;i++)res.push({x:x,y:y}),x+=sX,y+=sY;return res}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getRndYLinspaceX=getRndYLinspaceX,exports.getLinspaceYLinspaceX=getLinspaceYLinspaceX},function(module,exports){"use strict";function print(){for(var s="",_len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];for(var i=0;i<args.length;i++)s=s+" "+JSON.stringify(args[i]);console.log(s)}function printWarn(){for(var s="",_len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];for(var i=0;i<args.length;i++)s=s+" "+JSON.stringify(args[i]);console.warn(s)}function updateCanvas(width,height){var canvasStr='<canvas width="'+width+'" height="'+height+'" id="drawing"></canvas>';document.getElementById("box").innerHTML=canvasStr;var canvas=document.getElementById("drawing"),ctx=canvas.getContext("2d");return ctx}function animloop(f){f(),setTimeout(function(){animloop(f)},1e3/60)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.print=print,exports.printWarn=printWarn,exports.updateCanvas=updateCanvas,exports.animloop=animloop}]);
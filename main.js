//canvas.clientWidth canvas.clientHeight

/////NEED TO ANALYSE CODE

/* Licensed under a BSD license. See license.html for license */
"use strict";

function main() {
  // Get A WebGL context

  // Here we do this one 1 of 2 ways like many WebGL libraries. Either
  // we have a canvas on the page. Or else we have container and we
  // insert a canvas inside that container.
  // If we don't find a container we use the body of the document.
  var container = document.getElementById("canvas") || document.body;
  var isCanvas = (container instanceof HTMLCanvasElement);
  var canvas = isCanvas ? container : document.createElement("canvas");

  if (!isCanvas) {
    container.appendChild(canvas);
  }


////////////////////////


  var objects = [];
  var numObjects = 300;
  for (var ii = 0; ii < numObjects; ++ii) {
    objects.push({
      speed: 0.25,
      radius: 60,
      radius2: 10,
      xRotation: ii / (numObjects / 40) * Math.PI * 2,
      yRotation: ii / (numObjects / 1) * Math.PI * 2,
    });
  }

  requestAnimationFrame(drawScene);

  // Draw the scene.
  function drawScene(time) {

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Set the viewport to match the canvas
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Compute the projection matrix
    var aspect = canvas.clientWidth / canvas.clientHeight;

    requestAnimationFrame(drawScene);
  }
}

// Check if we're running in jQuery
if (window.$) {
  window.$(function(){
    main();
  });
} else {
  window.addEventListener('load', main);
}

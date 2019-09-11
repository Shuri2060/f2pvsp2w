//canvas.clientWidth canvas.clientHeight

/////NEED TO ANALYSE CODE

function main() {
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

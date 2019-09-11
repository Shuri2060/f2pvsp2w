function main() {
  var container = document.getElementById("canvas") || document.body;
  var isCanvas = (container instanceof HTMLCanvasElement);
  var canvas = isCanvas ? container : document.createElement("canvas");

  if (!isCanvas) {
    container.appendChild(canvas);
  }

  requestAnimationFrame(drawScene);

  // Draw the scene.
  function drawScene(time) {

    //webglUtils.resizeCanvasToDisplaySize(gl.canvas); ?????????

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

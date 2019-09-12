const Math_PI = Math.PI
const Math_2PI = Math_PI * 2

function main() {
  var container = document.getElementById("canvas") || document.body;
  var isCanvas = (container instanceof HTMLCanvasElement);
  var canvas = isCanvas ? container : document.createElement("canvas");
  if (document.activeElement && document.activeElement != canvas) {document.activeElement.blur()}
  canvas.focus()
  
  const ctx = canvas.getContext('2d');
  
  if (!isCanvas) {
    container.appendChild(canvas);
  }
  
  //Apparently all this setup is needed ^. Who knows.
  
  requestAnimationFrame(beforeFrame);

  var t = 0 //test
  
  function beforeFrame(time) { //let's name it something better later

    //webglUtils.resizeCanvasToDisplaySize(gl.canvas); // Analyze later

    //var aspect = canvas.clientWidth / canvas.clientHeight; // needed for later probs

    //All updating and drawing code... here!
    
    t += 0.001
    
    ctx.beginPath();
    ctx.arc(100+t, 100+t, 10, 0, Math_2PI);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    
    requestAnimationFrame(beforeFrame);
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

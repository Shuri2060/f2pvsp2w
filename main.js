const Math_PI = Math.PI
const Math_2PI = Math_PI * 2

function main() {
  const canvas = document.getElementById("gameCanvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')
  
  if (document.activeElement && document.activeElement != canvas) {document.activeElement.blur()}
  canvas.focus()
  
  //Apparently all this setup is needed ^. Who knows.
  
  const cacheCanvas = document.createElement('canvas');
  cacheCanvas.width = canvas.width
  cacheCanvas.height = canvas.height
  const cacheCtx = cacheCanvas.getContext('2d');

  ctx.beginPath()
  ctx.arc(100, 100, 10, 0, Math_2PI)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.closePath()
  
  cacheCtx.drawImage(canvas, 0, 0);
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.drawImage(cacheCanvas, 0, 0);
  
  var t = 0 //test

  function beforeFrame(time) { //let's name it something better later
    
    cacheCtx.drawImage(canvas, 0, 0);
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    ctx.drawImage(cacheCanvas, 0, 0);
    
    //var aspect = canvas.clientWidth / canvas.clientHeight; // needed for later probs

    //All updating and drawing code... here!
    
    t += 1
    
    ctx.beginPath()
    ctx.arc(100+t, 100+t, 10, 0, Math_2PI)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
    
    requestAnimationFrame(beforeFrame)
  }
//   requestAnimationFrame(beforeFrame)
}

// Check if we're running in jQuery
if (window.$) {
  window.$(function(){
    main();
  });
} else {
  window.addEventListener('load', main)
}

const Math_PI = Math.PI
const Math_2PI = Math_PI * 2

function main() {
  const canvas = document.getElementById("gameCanvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')
  
  if (document.activeElement && document.activeElement != canvas) {document.activeElement.blur()}
  canvas.focus() //not 100% sure what this does
  
  function beforeFrame(time) { //let's name it something better later
    
    canvas.clearRect(0, 0, canvas.width, canvas.height)
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    //var aspect = canvas.clientWidth / canvas.clientHeight; // needed for later probs

    //All updating and drawing code... here!
    
    ctx.beginPath()
    ctx.arc(100, 100, 10, 0, Math_2PI)
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()
    ctx.closePath()
    
    requestAnimationFrame(beforeFrame)
  }
  requestAnimationFrame(beforeFrame)
}

// Check if we're running in jQuery // Not entirely sure what this does either
if (window.$) {
  window.$(function(){
    main();
  });
} else {
  window.addEventListener('load', main)
}

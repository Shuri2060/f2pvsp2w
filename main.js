//Top Left is origin

//*DEBUG
var maxX = 1024
var maxY = 1024

var objArr = []
for (let i = 0; i < 500; i++) {
  objArr[i] = new Game2D2Object({sx: Math.random() * maxX, sy: Math.random() * maxY, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, ax: (Math.random() - 0.5) * 0, ay: (Math.random() - 0.5) * 0, as: (Math.random() - 0.5) * 4, av: (Math.random() - 0.5) * 10, aa: (Math.random() - 0.5) * 1, r: Math.random() * 25})
}
/**/

function main() {
  const Math_PI = Math.PI
  const Math_2PI = Math_PI * 2
  
  const canvas = document.getElementById("gameCanvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')
  
  if (document.activeElement && document.activeElement != canvas) {document.activeElement.blur()}
  canvas.focus() //not 100% sure what this does
  
  var canvasWidth = canvas.width
  var canvasHeight = canvas.height
  
  var gameCanvasRatio = Math.min(canvasWidth / maxX, canvasHeight / maxY)
  var gameWidth = maxX * gameCanvasRatio
  var gameHeight = maxY * gameCanvasRatio
  var gameLeft = (canvasWidth - gameWidth) / 2
  var gameRight = gameLeft + gameWidth
  var gameTop = (canvasHeight - gameHeight) / 2
  var gameBottom = gameTop + gameHeight
  
  var dt = 0
  var lastTime = 0
  
  function beforeFrame(time) { //let's name it something better later
    
    const timeSec = time / 1000
    
    dt = timeSec - lastTime
    lastTime = timeSec
    
    console.log(dt) //DEBUG
    
    if (canvasWidth !== window.innerWidth || canvasHeight != window.innerHeight) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      canvasWidth = canvas.width
      canvasHeight = canvas.height
      
      gameCanvasRatio = Math.min(canvasWidth / maxX, canvasHeight / maxY)
      gameWidth = maxX * gameCanvasRatio
      gameHeight = maxY * gameCanvasRatio
      gameLeft = (canvasWidth - gameWidth) / 2
      gameRight = gameLeft + gameWidth
      gameTop = (canvasHeight - gameHeight) / 2
      gameBottom = gameTop + gameHeight
    }
    
    //var aspect = canvas.clientWidth / canvas.clientHeight; // needed for later probs
    
    //All updating and drawing code... here!
    //updating
    simPhysics(objArr, dt)
    colCheck(objArr)
    
    //drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    for (let i = objArr.length; i--;) {
      const objArrI = objArr[i]
      
      ctx.beginPath()
//       ctx.strokeStyle = "#0000FF"
//       ctx.lineWidth = 4
      ctx.arc((gameLeft + objArrI.sx * gameCanvasRatio) | 0, (gameTop + objArrI.sy * gameCanvasRatio) | 0, (objArrI.r * gameCanvasRatio) | 0, 0, Math_2PI)
      ctx.fillStyle = "#FFFFFF"
      ctx.fill()
      ctx.closePath()
    }
    
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

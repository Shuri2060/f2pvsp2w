//Top Left is origin

//*DEBUG

var fps = 0
var fpsUpdate = 0

function main() {
  const Math_PI = Math.PI
  const Math_2PI = Math_PI * 2
  
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
  
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
    
    //console.log(dt) //DEBUG
    
    if (canvasWidth !== window.innerWidth || canvasHeight !== window.innerHeight) {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
      
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
    
    update(dt)
    simPhysics(objArr, dt)
    const collisions = colCheck(objArr)
    afterColl(collisions)
    
    //drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    for (let i = objArr.length; i--;) {
      const objArrI = objArr[i]
      
      ctx.beginPath()
      //ctx.arc((gameLeft + objArrI.sx * gameCanvasRatio) | 0, (gameTop + objArrI.sy * gameCanvasRatio) | 0, (objArrI.r * gameCanvasRatio) | 0, 0, Math_2PI)
      ctx.arc((gameLeft + objArrI.sx * gameCanvasRatio), (gameTop + objArrI.sy * gameCanvasRatio), (objArrI.r * gameCanvasRatio), 0, Math_2PI)
      for (let j = collisions.length; j--;) {
        const collJ = collisions[j]
        if (collJ[0] === objArrI || collJ[1] === objArrI) {
          ctx.fillStyle = "#FFA500"
          break;
        } else {
          ctx.fillStyle = "#00FF00"
        }
      }
      ctx.fill()
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.closePath()
    }
    
    ctx.beginPath()
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 4
    ctx.strokeRect(gameLeft+2, gameTop+2, gameWidth-4, gameHeight-4)
    
    //DEBUG
    if (time - fpsUpdate > 1000) {
      fpsUpdate += 1000
      
      fps = 1 / dt
    }
    ctx.font = '40px Consolas';
    ctx.fillStyle = '#FF0000';
    ctx.fillText(fps.toFixed(2) + ' fps', gameRight - 200, gameTop + 60);
    
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

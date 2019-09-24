//For now Leave this stuff as it is

maxX = 1024
maxY = 1024

grid = []
gridCellX = 64
gridCellY = 64
gridX = maxX / gridCellX
gridY = maxY / gridCellY

for (let i = 0; i < gridX; i++) {
  grid[i] = []
  for (let j = 0; j < gridY; j++) {
    grid[i][j] = []
  }
}

var objArr = []
//------------------------------------------------
//Put your setup code here. eg. -
var playerArr = []
var bulletArr = []
for (let i = 0; i < 50; i++) {
  objArr[i] = new Game2D2Object({sx: Math.random() * maxX, sy: Math.random() * maxY, vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.5) * 40, ax: (Math.random() - 0.5) * 0.01, ay: (Math.random() - 0.5) * 0.01, as: (Math.random() - 0.5) * 4, av: (Math.random() - 0.5) * 10, aa: (Math.random() - 0.5) * 1, r: Math.random() * 100})
  objArr[i].health = 100
  playerArr[i] = objArr[i]
  
}
//------------------------------------------------
//Every frame, the below occurs. All custom code goes in update() and afterColl()
// update(dt)
// simPhysics(objArr, dt)
// const collisions = colCheck(objArr)
// afterColl(collisions)

function update(dt) { //dt is time in seconds that have passed since last frame
  
}

function afterColl(collisions, dt , vx, vy , ax, ay) { //collisions is an array of pairs of objects that collide
  for(let i = 0; i < collisions.length; i++) {
    collisions[i][0].health -= 2 * dt
    collisions[i][1].health -= 2 * dt
    const obj0Dead = (collisions[i][0].health <= 0)
    const obj1Dead = (collisions[i][1].health <= 0)
    
    if (obj0Dead || obj1Dead) {
      for (let j = objArr.length; j--;) {
        if ((obj0Dead && objArr[j] === collisions[i][0]) || (obj1Dead && objArr[j] === collisions[i][1])) {objArr.splice(j, 1)}
      } 
    }
  }
  
  for(let i =0; i  <collisions.length; i++) {
    collisions[i][0].health -= 1
    collisions[i][1].health -= 1    
    collisions[i][0].vx *= -1
    collisions[i][1].vx *= -1
    collisions[i][0].vy *= -1
    collisions[i][1].vy *= -1
    collisions[i][0].ax *= -1
    collisions[i][1].ax *= -1
    collisions[i][0].ay *= -1
    collisions[i][1].ay *= -1

  }
}

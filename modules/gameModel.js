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
  playerArr.push(objArr[i])
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
    const obj0 = collisions[i][0]
    const obj1 = collisions[i][1]

    const obj0spe = Math.sqrt(obj0.vx ** 2 + obj0.vy ** 2)
    const obj1spe = Math.sqrt(obj1.vx ** 2 + obj1.vy ** 2)

    obj0.health -= 1 * dt
    obj1.health -= 1 * dt
    obj0.ax += 0 //todo pen and paper
    obj0.ay += 0
    obj1.ax += 0
    obj1.ay += 0
    const obj0Dead = (obj0.health <= 0)
    const obj1Dead = (obj1.health <= 0)
    
    if (obj0Dead || obj1Dead) {
      for (let j = objArr.length; j--;) {
        if ((obj0Dead && objArr[j] === obj0) || (obj1Dead && objArr[j] === obj1)) {objArr.splice(j, 1)}
      } 
    if (obj0Dead || obj1Dead) {
      for (let j = playerArr.length; j--;) {
        if ((obj0Dead && playerArr[j] === obj0) || (obj1Dead && playerArr[j] === obj1)) {playerArr.splice(j, 1)}
      } 
    if (obj0Dead || obj1Dead) {
      for (let j = bulletArr.length; j--;) {
        if ((obj0Dead && bulletArr[j] === obj0) || (obj1Dead && bulletArr[j] === obj1)) {bulletArr.splice(j, 1)}
      }  
    }
  }
  
}
